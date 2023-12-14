import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards, Req, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { RouteRequirements, RouteRequirementDetails } from '../auth/enums/routes.enum';
import { UpdateByUuidResponseDto, ChangeActivationStatusByUuidResponseDto, ReadAllUsersResponseDto, FindOneByEmailResponseDto, FindOneByUuidResponseDto, FindOneResponseDto, CreateUserResponseDto, UpdateUserResponseDto, ActivateUserResponseDto} from './dto/other-user-responses.dto';
import { RateLimit } from '../common/decorators/rate-limit.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    ) {}

  @Get()
  @RateLimit(RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(): Promise<ReadAllUsersResponseDto[]> {
    return this.userService.findAll();
  }

  @Get('email')
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOneByEmail].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOneByEmail].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].roles)
  findOneByEmail(@Query('email') email: string): Promise<FindOneByEmailResponseDto> {
    return this.userService.findOneByEmail(email);
  }

  @Get('uuid')
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOneByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOneByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].permissions)
  findOneByUuid(@Query('uuid') uuid: string, @Req() req): Promise<FindOneByUuidResponseDto> {
    const userRequesting = req.user;
    return this.userService.findOneByUuid(uuid, userRequesting.uuid, userRequesting.role);
  }

  @Get(':id')
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOne].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOne].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOne].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOne].roles)
  findOne(@Param('id') id: number): Promise<FindOneResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Put('uuid')
  @RateLimit(RouteRequirementDetails[RouteRequirements.UpdateByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.UpdateByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.UpdateByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.UpdateByUuid].permissions)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  updateByUuid(@Query('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto, @Req() req): Promise<UpdateByUuidResponseDto> {
    const userRequesting = req.user;
    return this.userService.updateByUuid(uuid, updateUserDto, userRequesting.uuid, userRequesting.role);
  }

  @Put(':id')
  @RateLimit(RouteRequirementDetails[RouteRequirements.UpdateUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.UpdateUser].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.UpdateUser].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.UpdateUser].permissions)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponseDto> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete')
  @RateLimit(RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].roles)
  softDeleteByUuid(@Query('uuid') uuid: string, @Req() req): Promise<void> {
    const userRequesting = req.user;
    return this.userService.softDeleteByUuid(uuid, userRequesting.uuid, userRequesting.role);
  }

  @Patch('activate')
  @RateLimit(RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)
  changeActivationStatusByUuid(@Query('uuid') uuid: string, @Req() req): Promise<ChangeActivationStatusByUuidResponseDto> {
    const userRequesting = req.user; 
    return this.userService.changeActivationStatusByUuid(uuid, userRequesting.uuid, userRequesting.role);
  }

  @Delete(':id/delete')
  @RateLimit(RouteRequirementDetails[RouteRequirements.SoftDelete].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.SoftDelete].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDelete].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDelete].roles)
  softDelete(@Param('id') id: number): Promise<void> {
    return this.userService.softDelete(id);
  }

  @Patch(':id/activate')
  @RateLimit(RouteRequirementDetails[RouteRequirements.ActivateUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ActivateUser].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ActivateUser].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.ActivateUser].roles)
  changeActivationStatus(@Param('id') id: number, @Body() isActive: boolean): Promise<ActivateUserResponseDto> {
    return this.userService.changeActivationStatus(id);
  }

  @Post('login')
  @RateLimit(RouteRequirementDetails[RouteRequirements.LoginUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.LoginUser].rateLimitPoints)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.uuid, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

    return {
      message: 'Login successful',
      user,
      token,
    };
  }
}
