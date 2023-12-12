import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { RouteRequirements, RouteRequirementDetails } from '../auth/enums/routes.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    ) {}

  @Get()
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('email')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].roles)
  findOneByEmail(@Query('email') email: string): Promise<User> {
    return this.userService.findOneByEmail(email);
  }

  @Get('uuid')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].permissions)
  findOneByUuid(@Query('uuid') uuid: string, @Req() req): Promise<User> {
    const userRequesting = req.user;
    return this.userService.findOneByUuid(uuid, req.requesterUuid, req.requesterRole);
  }

  @Get(':id')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOne].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOne].roles)
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.UpdateUser].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.UpdateUser].permissions)
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete('delete')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].roles)
  softDeleteByUuid(@Query('uuid') uuid: string, @Req() req): Promise<void> {
    const userRequesting = req.user;
    return this.userService.softDeleteByUuid(uuid, userRequesting.uuid, userRequesting.role);
  }

  @Patch('activate')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)
  changeActivationStatusByUuid(@Query('uuid') uuid: string, @Req() req): Promise<User> {
    const userRequesting = req.user; 
    return this.userService.changeActivationStatusByUuid(uuid, userRequesting.uuid, userRequesting.role);
  }

  @Delete(':id/delete')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDelete].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDelete].roles)
  softDelete(@Param('id') id: number): Promise<void> {
    return this.userService.softDelete(id);
  }

  @Patch(':id/activate')
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ActivateUser].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.ActivateUser].roles)
  changeActivationStatus(@Param('id') id: number, @Body() isActive: boolean): Promise<User> {
    return this.userService.changeActivationStatus(id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
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
