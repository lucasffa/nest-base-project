import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards, Req, ValidationPipe, UsePipes, UnauthorizedException, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { RouteRequirements, RouteRequirementDetails } from '../auth/enums/routes.enum';
import { UpdateByUuidResponseDto, LoginResponseDto, ChangeActivationStatusByUuidResponseDto, ReadAllUsersResponseDto, FindOneByEmailResponseDto, FindOneByUuidResponseDto, FindOneResponseDto, CreateUserResponseDto, UpdateUserResponseDto, ActivateUserResponseDto} from './dto/other-user-responses.dto';
import { RateLimit } from '../common/decorators/rate-limit.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { generateProperties } from '../common/helpers/generate-properties.helper';
import { generateExample } from 'src/common/helpers/generate-examples.helper';
import { User } from './user.entity';

@ApiTags('users')
@ApiBearerAuth('BearerAuth')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private readonly logService: LogService,
    ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Fetches a list of all registered users' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of users', 
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.ReadAllUsers].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ReadAllUsers].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ReadAllUsers].permissions)
  findAll(@Req() req): Promise<ReadAllUsersResponseDto[]> {
    const userReq = req.user;
    this.logService.log('Fetching all users', 'UserController', {uuidReq: userReq?.uuid});
    return this.userService.findAll();
  }

  @Get('email')
  @ApiOperation({ summary: 'Get user by email', description: 'Fetches a user by email' })
  @ApiQuery({ name: 'email', description: 'User found by email', type: String, required: true, example: generateExample(['email']).email })
  @ApiResponse({ status: 200, description: 'User found by email',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.FindOneByEmail].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOneByEmail].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOneByEmail].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.FindOneByEmail].permissions)
  findOneByEmail(@Req() req, @Query('email') email: string): Promise<FindOneByEmailResponseDto> {
    const userReq = req.user;
    this.logService.log('Fetching user by email', 'UserController', {emailQuery: email, uuidReq: userReq?.uuid});
    return this.userService.findOneByEmail(email);
  }

  @Get('uuid')
  @ApiOperation({ summary: 'Get user by uuid', description: 'Fetches a user by uuid' })
  @ApiQuery({ name: 'uuid', description: 'User found by uuid', type: String, required: true, example: generateExample(['uuid']).uuid })
  @ApiResponse({ status: 200, description: 'User found by uuid',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.FindOneByUuid].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOneByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOneByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].guards)
  @Permissions(...RouteRequirementDetails[RouteRequirements.FindOneByUuid].permissions)
  findOneByUuid(@Query('uuid') uuid: string, @Req() req): Promise<FindOneByUuidResponseDto> {
    const userReq = req.user;
    this.logService.log('Fetching user by uuid', 'UserController', {uuidQuery: uuid, uuidReq: userReq?.uuid});
    return this.userService.findOneByUuid(uuid, userReq.uuid, userReq.role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id', description: 'Fetches a user by id' })
  @ApiParam({ name: 'id', description: 'User found by id', type: Number, required: true, example: generateExample(['id']).id })
  @ApiResponse({ status: 200, description: 'User found by id',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.FindOne].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.FindOne].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.FindOne].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.FindOne].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.FindOne].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.FindOne].permissions)
  findOne(@Param('id') id: number, @Req() req): Promise<FindOneResponseDto> {
    const userReq = req.user;
    this.logService.log('Fetching user by id', 'UserController', {idQuery: id, uuidReq: userReq?.uuid});
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiBody({ type: CreateUserDto, description: 'User created', required: true })
  @ApiResponse({ status: 201, description: 'User created',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.CreateUser].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.CreateUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.CreateUser].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.CreateUser].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.CreateUser].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.CreateUser].permissions)
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    this.logService.log('Creating user', 'UserController', {email: createUserDto.email});
    return this.userService.create(createUserDto);
  }

  @Put('uuid')
  @ApiOperation({ summary: 'Update user by uuid', description: 'Updates a user by uuid' })
  @ApiQuery({ name: 'uuid', description: 'User updated by uuid', type: String, required: true, example: generateExample(['uuid']).uuid })
  @ApiBody({ type: UpdateUserDto, description: 'User updated', required: true })
  @ApiResponse({ status: 200, description: 'User updated',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.UpdateByUuid].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.UpdateByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.UpdateByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.UpdateByUuid].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.UpdateByUuid].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.UpdateByUuid].permissions)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  updateByUuid(@Query('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto, @Req() req): Promise<UpdateByUuidResponseDto> {
    const userReq = req.user;
    this.logService.log('Updating user by uuid', 'UserController', {uuidQuery: uuid, uuidReq: userReq?.uuid});
    return this.userService.updateByUuid(uuid, updateUserDto, userReq.uuid, userReq.role);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id', description: 'Updates a user by id' })
  @ApiParam({ name: 'id', description: 'User updated by id', type: Number, required: true, example: generateExample(['id']).id })
  @ApiBody({ type: UpdateUserDto, description: 'User updated', required: true })
  @ApiResponse({ status: 200, description: 'User updated',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.UpdateUser].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.UpdateUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.UpdateUser].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.UpdateUser].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.UpdateUser].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.UpdateUser].permissions)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req): Promise<UpdateUserResponseDto> {
    const userReq = req.user;
    this.logService.log('Updating user by id', 'UserController', {idQuery: id, uuidReq: userReq?.uuid});
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete user by uuid', description: 'Deletes a user by uuid' })
  @ApiQuery({ name: 'uuid', description: 'User deleted by uuid', type: String, required: true, example: generateExample(['uuid']).uuid })
  @ApiResponse({ status: 200, description: 'User deleted by uuid',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].permissions)
  softDeleteByUuid(@Query('uuid') uuid: string, @Req() req): Promise<void> {
    const userReq = req.user;
    this.logService.log('Soft deleting user by uuid', 'UserController', {uuidQuery: uuid, uuidReq: userReq?.uuid});
    return this.userService.softDeleteByUuid(uuid, userReq.uuid, userReq.role);
  }

  @Patch('activate')
  @ApiOperation({ summary: 'Activate user by uuid', description: 'Activates a user by uuid' })
  @ApiQuery({ name: 'uuid', description: 'User activated by uuid', type: String, required: true, example: generateExample(['uuid']).uuid })
  @ApiResponse({ status: 200, description: 'User activated by uuid',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].permissions)
  changeActivationStatusByUuid(@Query('uuid') uuid: string, @Req() req): Promise<ChangeActivationStatusByUuidResponseDto> {
    const userReq = req.user; 
    this.logService.log('Changing activation status by uuid', 'UserController', {uuidQuery: uuid, uuidReq: userReq?.uuid});
    return this.userService.changeActivationStatusByUuid(uuid, userReq.uuid, userReq.role);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete user by id', description: 'Deletes a user by id' })
  @ApiParam({ name: 'id', description: 'User deleted by id', required: true, type: Number, example: generateExample(['id']).id })
  @ApiResponse({ status: 200, description: 'User deleted by id',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.SoftDelete].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.SoftDelete].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.SoftDelete].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.SoftDelete].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.SoftDelete].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.SoftDelete].permissions)
  softDelete(@Param('id') id: number, @Req() req): Promise<void> {
    const userReq = req.user;
    this.logService.log('Soft deleting user by id', 'UserController', {idQuery: id, uuidReq: userReq?.uuid});
    return this.userService.softDelete(id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate user by id', description: 'Activates a user by id' })
  @ApiParam({ name: 'id', description: 'User activated by id', type: Number, required: true, example: generateExample(['id']).id })
  @ApiResponse({ status: 200, description: 'User activated by id',
    schema: { 
      type: 'array',
      items: {
        type: 'object',
        properties: generateProperties(RouteRequirementDetails[RouteRequirements.ActivateUser].fields),
      },
    }
  })
  @RateLimit(RouteRequirementDetails[RouteRequirements.ActivateUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.ActivateUser].rateLimitPoints)
  @UseGuards(...RouteRequirementDetails[RouteRequirements.ActivateUser].guards)
  @Roles(...RouteRequirementDetails[RouteRequirements.ActivateUser].roles)
  @Permissions(...RouteRequirementDetails[RouteRequirements.ActivateUser].permissions)
  changeActivationStatus(@Param('id') id: number, @Req() req): Promise<ActivateUserResponseDto> {
    const userReq = req.user;
    this.logService.log('Changing activation status by id', 'UserController', {idQuery: id, uuidReq: userReq?.uuid});
    return this.userService.changeActivationStatus(id);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user', description: 'Logs in a user' })
  @ApiBody({ type: LoginDto, description: 'User logged in', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in',
    schema: { 
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Login successful',
        },
        user: {
          type: 'object',
          properties: generateProperties(RouteRequirementDetails[RouteRequirements.LoginUser].fields),
        },
        token: {
          type: 'string',
          example: 'ey...',
        },
      },
    },
  })  
  @RateLimit(RouteRequirementDetails[RouteRequirements.LoginUser].rateLimitTimeWindow, RouteRequirementDetails[RouteRequirements.LoginUser].rateLimitPoints)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    this.logService.log('Login attempt', 'UserController', { email: loginDto.email });
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.logService.log('Login successful', 'UserController', { email: user.email, uuid: user.uuid });

    const payload = { email: user.email, sub: user.uuid, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

    return {
      message: 'Login successful',
      user,
      token,
    };
  }
}
