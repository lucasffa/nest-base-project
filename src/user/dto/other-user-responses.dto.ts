import { BaseUserResponseDto } from './base-user-response.dto';
import { RouteRequirementDetails, RouteRequirements } from '../../auth/enums/routes.enum';

export class SoftDeleteByUuidResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.SoftDeleteByUuid].fields);
  }
}

export class ChangeActivationStatusByUuidResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.ChangeActivationStatusByUuid].fields);
  }
}

export class ReadAllUsersResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.ReadAllUsers].fields);
  }
}

export class FindOneByEmailResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.FindOneByEmail].fields);
  }
}

export class FindOneByUuidResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.FindOneByUuid].fields);
  }
}

export class FindOneResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.FindOne].fields);
  }
}

export class CreateUserResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.CreateUser].fields);
  }
}

export class UpdateUserResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.UpdateUser].fields);
  }
}

export class SoftDeleteResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.SoftDelete].fields);
  }
}

export class ActivateUserResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.ActivateUser].fields);
  }
}

export class LoginUserResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.LoginUser].fields);
  }
}

export class UpdateByUuidResponseDto extends BaseUserResponseDto {
  constructor(user: any) {
    super(user, RouteRequirementDetails[RouteRequirements.UpdateByUuid].fields);
  }
}

export class LoginResponseDto {
  message: string;
  user: LoginUserResponseDto; // Assuming UserDto is already defined to represent user details
  token: string;
}
