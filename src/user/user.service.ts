import { Injectable, ConflictException, InternalServerErrorException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../auth/enums/roles.enum';
import { PermissionChecker } from '../helpers/permission-checker';
import { RouteRequirements, RouteRequirementDetails } from '../auth/enums/routes.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private permissionChecker: PermissionChecker,
  ) {}

  // If User is deleted, it will not be returned by this method
  findAll(): Promise<User[]> {
    return this.usersRepository.find({where: {isDeleted: false}});
  }

  findOne(id: number): Promise<User> {
    try{
      return this.usersRepository.findOne({where: {id}});

    }catch(error){
      throw new NotFoundException('User not found.');
    }
  }

  
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);

    user.uuid = uuidv4();
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.isActive = true;
    user.isDeleted = false;
    
    user.setPassword(user.password);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('This email is already in use.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    try{
      user.updatedAt = new Date();
      await this.usersRepository.update(id, user);
      return this.usersRepository.findOne({where: {id}});

    }catch(error){
      throw new NotFoundException('User not found.');
    }
  }

  async softDelete(id: number): Promise<void> {
    try{
      await this.usersRepository.update(id, { 
        isActive: false,
        isDeleted: true, 
        deletedAt: new Date() 
      });

    }catch(error){
      throw new NotFoundException('User not found.');
    }
  }

  async changeActivationStatus(id: number): Promise<User> {
    try {
      // Find user data
      const userData = await this.usersRepository.findOne({ where: { id } });
      if (!userData) {
        throw new NotFoundException('User not found.');
      }

      // Toggle isActive status
      userData.isActive = !userData.isActive;

      // If activating a previously deleted (soft deleted) user
      if (userData.isActive && userData.isDeleted) {
        userData.isDeleted = false;
      }

      // Save changes
      await this.usersRepository.save(userData);
      
      return userData;
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  async softDeleteByUuid(uuid: string, requesterUuid, requesterRole): Promise<void> {
    
    // Check if requester has permission to soft delete user
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to soft delete this user');
    }

    const result = await this.usersRepository.update({ uuid }, { 
      isActive: false,
      isDeleted: true,
      deletedAt: new Date(),
    });
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with UUID ${uuid} not found`);
    }
  }

  async changeActivationStatusByUuid(uuid: string, requesterUuid: string, requesterRole: Role): Promise<User> {
    
    // Check if requester has permission to toggle activation status
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to toggle this user\'s activation status');
    }

    try {
      const userData = await this.usersRepository.findOne({ where: { uuid } });
      if (!userData) {
        throw new NotFoundException(`User with UUID ${uuid} not found`);
      }

      // Toggle isActive status
      userData.isActive = !userData.isActive;

      // Handling for previously deleted users
      if (userData.isActive && userData.isDeleted) {
        userData.isDeleted = false;
        userData.deletedAt = null;
      }

      await this.usersRepository.save(userData);
      
      return userData;
    } catch (error) {
      throw new NotFoundException('User not found.');
    }
  }

  async findOneByUuid(uuid: string, requesterUuid, requesterRole): Promise<User> {
        
    // Check if requester has permission to find one user by uuid
    if (!this.permissionChecker.canPerformAction(requesterUuid, uuid, requesterRole, ...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)) {
      throw new UnauthorizedException('You do not have permission to try to find this user by uuid');
    }

    try{    
      return this.usersRepository.findOne({where: {uuid, isDeleted: false, isActive: true}});
    }catch(error){
      throw new NotFoundException('User not found.');
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try{    
      return this.usersRepository.findOne({where: {email, isDeleted: false, isActive: true}});
    }catch(error){
      throw new NotFoundException('User not found.');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
