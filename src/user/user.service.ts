import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../auth/enums/roles.enum';
import { PermissionChecker } from '../common/helpers/permission-checker.helper';
import { RouteRequirements, RouteRequirementDetails } from '../auth/enums/routes.enum';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UpdateByUuidResponseDto, LoginUserResponseDto, SoftDeleteByUuidResponseDto, ChangeActivationStatusByUuidResponseDto, ReadAllUsersResponseDto, FindOneByEmailResponseDto, FindOneByUuidResponseDto, FindOneResponseDto, CreateUserResponseDto, UpdateUserResponseDto, SoftDeleteResponseDto, ActivateUserResponseDto} from './dto/other-user-responses.dto';
import { LogService } from '../log/log.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private permissionChecker: PermissionChecker,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly logService: LogService,
  ) {}

  async findAll(): Promise<ReadAllUsersResponseDto[]> {
    const cacheKey = 'users_all';
    try {
      const cachedUsers = await this.cacheManager.get<ReadAllUsersResponseDto[]>(cacheKey);
      if (cachedUsers) {
        return cachedUsers;
      }
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users from cache');
    }
    try {
      const users = await this.usersRepository.find({ where: { isDeleted: false } });
      await this.cacheManager.set(cacheKey, users);
      return users.map(user => new ReadAllUsersResponseDto(user));
    } catch (error) {
      this.logService.error('Error fetching users from database', error, 'UserService.findAll');
      throw new InternalServerErrorException('Error fetching users from database');
    }
  }
  
  async findOne(id: number): Promise<FindOneResponseDto> {
    const cacheKey = `user_${id}`;
    try {
      const cachedUser = await this.cacheManager.get<User>(cacheKey);
      if (cachedUser) {
        return cachedUser;
      }
      const user = await this.usersRepository.findOne({ where: { id, isDeleted: false } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      await this.cacheManager.set(cacheKey, user);
      return new FindOneResponseDto(user);
    } catch (error) {
      this.logService.error('Error finding user', error, 'UserService.findOne');
      throw new NotFoundException('User not found.');
    }
  }
  
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = new User();
    Object.assign(user, createUserDto);
    user.uuid = uuidv4();
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.isActive = true;
    user.isDeleted = false;
    user.setPassword(user.password);
    try {
      const savedUser = await this.usersRepository.save(user);
      await this.cacheManager.del('users_all');  
      return new CreateUserResponseDto(savedUser);
    } catch (error) {
      if (error.code === '23505') {
        this.logService.error('Error creating user', 'Email is already in use', 'UserService.create');
        throw new ConflictException('Email is already in use');
      } else {
        this.logService.error('Error creating user', error, 'UserService.create');
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async updateByUuid(uuid: string, updateUserDto: UpdateUserDto, requesterUuid, requesterRole): Promise<UpdateByUuidResponseDto> {    
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.UpdateByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to update this user');
    }
    try {
      const userUpdateData = { ...updateUserDto, updatedAt: new Date() };
      await this.usersRepository.update({ uuid }, userUpdateData);
      const updatedUser = await this.usersRepository.findOne({ where: { uuid } });
      if (!updatedUser) {
        throw new NotFoundException(`User not found.`);
      }
      await this.cacheManager.del(`user_${uuid}`);
      return new UpdateByUuidResponseDto(updatedUser);
    } catch (error) {
      this.logService.error('Error updating user with uuid', error, 'UserService.updateByUuid');
      throw new NotFoundException('User not found.');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    try {
      const userUpdateData = { ...updateUserDto, updatedAt: new Date() };
      await this.usersRepository.update(id, userUpdateData);
      const updatedUser = await this.usersRepository.findOne({ where: { id } });
      if (!updatedUser) {
        throw new NotFoundException('User not found.');
      }
      await this.cacheManager.del(`user_${id}`);
      return new UpdateUserResponseDto(updatedUser);
    } catch (error) {
      this.logService.error('Error updating user with id', error, 'UserService.update');
      throw new NotFoundException('User not found.');
    }
  }
  
  async softDelete(id: number): Promise<void> {
    try {
      const result = await this.usersRepository.update(id, { 
        isActive: false,
        isDeleted: true, 
        deletedAt: new Date() 
      });
      if(result.affected === 0){
        throw new NotFoundException('User not found.');
      }
      await this.cacheManager.del(`user_${id}`);
    } catch (error) {
      this.logService.error('Error soft deleting user with id', error, 'UserService.softDelete');
      throw new NotFoundException('User not found.');
    }
  }  

  async changeActivationStatus(id: number): Promise<ActivateUserResponseDto> {
    try {
      const userData = await this.usersRepository.findOne({ where: { id } });
      if (!userData) {
        throw new NotFoundException('User not found.');
      }
      userData.isActive = !userData.isActive;
      if (userData.isActive && userData.isDeleted) {
        userData.isDeleted = false;
      }
      userData.updatedAt = new Date();
      await this.usersRepository.save(userData);
      await this.cacheManager.del(`user_${id}`);
      return new ActivateUserResponseDto(userData);
    } catch (error) {
      this.logService.error('Error changing activation status of user with id', error, 'UserService.changeActivationStatus');
      throw new NotFoundException('User not found.');
    }
  }
  
  async softDeleteByUuid(uuid: string, requesterUuid, requesterRole): Promise<void> { 
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to soft delete this user');
    }
    try {
      const result = await this.usersRepository.update({ uuid }, { 
        isActive: false,
        isDeleted: true,
        deletedAt: new Date(),
      });
      if (result.affected === 0) {
        throw new NotFoundException('User not found.');
      }
      await this.cacheManager.del(`user_${uuid}`);
    } catch (error) {
      this.logService.error('Error soft deleting user with uuid', error, 'UserService.softDeleteByUuid');
      throw new NotFoundException('User not found.');
    }
  }

  async changeActivationStatusByUuid(uuid: string, requesterUuid: string, requesterRole: Role): Promise<ChangeActivationStatusByUuidResponseDto> {
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to toggle this user\'s activation status');
    }
    try {
      const userData = await this.usersRepository.findOne({ where: { uuid } });
      if (!userData) {
        throw new NotFoundException('User not found.');
      }
      userData.isActive = !userData.isActive;
      if (userData.isActive && userData.isDeleted) {
        userData.isDeleted = false;
        userData.deletedAt = null;
      }
      userData.updatedAt = new Date();
      await this.usersRepository.save(userData);
      await this.cacheManager.del(`user_${uuid}`);
      return new ChangeActivationStatusByUuidResponseDto(userData);
    } catch (error) {
      this.logService.error('Error changing activation status of user with uuid', error, 'UserService.changeActivationStatusByUuid');
      throw new NotFoundException('User not found.');
    }
  }

  async findOneByUuid(uuid: string, requesterUuid, requesterRole): Promise<FindOneByUuidResponseDto> {
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.FindOneByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to try to find this user by uuid');
    }
    const cacheKey = `user_${uuid}`;
    try {
      const cachedUser = await this.cacheManager.get<User>(cacheKey);
      if (cachedUser) {
        return cachedUser;
      }
      const user = await this.usersRepository.findOne({ where: { uuid, isDeleted: false, isActive: true } });
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      await this.cacheManager.set(cacheKey, user);
      return new FindOneByUuidResponseDto(user);
    } catch (error) {
      this.logService.error('Error finding user with uuid', error, 'UserService.findOneByUuid');
      throw new NotFoundException('User not found.');
    }
  }
  
  async findOneByEmail(email: string): Promise<FindOneByEmailResponseDto> {
    try{    
      const user = await this.usersRepository.findOne({where: {email, isDeleted: false, isActive: true}});
      if (!user) {
        throw new NotFoundException('User not found.');
      }
      return new FindOneByEmailResponseDto(user);
    }catch(error){
      this.logService.error('Error finding user with email', error, 'UserService.findOneByEmail');
      throw new NotFoundException('User not found.')
    }
  }

  private async findOneByEmailPrivately(email: string): Promise<User> {
    try{    
      const user = await this.usersRepository.findOne({where: {email, isDeleted: false, isActive: true}});
      return user;
    }catch(error){
      this.logService.error('Error finding user with email privately', error, 'UserService.findOneByEmailPrivately');
      throw new NotFoundException('User not found.');
    }
  }

  async validateUser(email: string, password: string): Promise<LoginUserResponseDto> {
    const user = await this.findOneByEmailPrivately(email);
    if (user && await user.validatePassword(password)) {
      const lastLoginAt = new Date();
      await this.usersRepository.update({ email }, { lastLoginAt: lastLoginAt })
      user.lastLoginAt = lastLoginAt;
      return new LoginUserResponseDto(user);
    }
    this.logService.error('Error validating user', 'Invalid credentials', 'UserService.validateUser');
    throw new UnauthorizedException('Invalid credentials');
  }
}