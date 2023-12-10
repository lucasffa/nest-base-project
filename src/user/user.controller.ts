import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from '../auth/permissions.enum';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    ) {}

  @Get()
  @Permissions(Permission.READ_ALL_USERS)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('email')
  findOneByEmail(@Query('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Get('uuid')
  findOneByUuid(@Query('uuid') uuid: string): Promise<User> {
    return this.userService.findOneByUuid(uuid);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete('delete')
  softDeleteByUuid(@Query('uuid') uuid: string): Promise<void> {
    return this.userService.softDeleteByUuid(uuid);
  }

  @Patch('activate')
  changeActivationStatusByUuid(@Query('uuid') uuid: string): Promise<User> {
    return this.userService.changeActivationStatusByUuid(uuid);
  }

  @Delete(':id/delete')
  softDelete(@Param('id') id: number): Promise<void> {
    return this.userService.softDelete(id);
  }

  @Patch(':id/activate')
  changeActivationStatus(@Param('id') id: number, @Body() isActive: boolean): Promise<User> {
    return this.userService.changeActivationStatus(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    console.log('JWT Secret in user.controller.login:', process.env.JWT_SECRET);
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
    

    return {
      message: 'Login successful',
      user,
      token,
    };
  }
}
