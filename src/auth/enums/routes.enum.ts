import { Role } from './roles.enum';
import { Permission } from './permissions.enum';
import { Guards } from './guards.enum';


// Route Requirements Enum
export enum RouteRequirements {
  SoftDeleteByUuid = 'SoftDeleteByUuid',
  ChangeActivationStatusByUuid = 'ChangeActivationStatusByUuid',
  ReadAllUsers = 'ReadAllUsers',
  FindOneByEmail = 'FindOneByEmail',
  FindOneByUuid = 'FindOneByUuid',
  FindOne = 'FindOne',
  CreateUser = 'CreateUser',
  UpdateUser = 'UpdateUser',
  SoftDelete = 'SoftDelete',
  ActivateUser = 'ActivateUser',
  LoginUser = 'LoginUser',
  // ... other routes as needed
}


// Updated Route Requirement Details
export const RouteRequirementDetails = {
  [RouteRequirements.SoftDeleteByUuid]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
  },
  [RouteRequirements.ChangeActivationStatusByUuid]: {
    roles: [],
    permissions: [Permission.TOGGLE_ONE_USER_STATUS, Permission.TOGGLE_OWN_USER_STATUS],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
  },
  [RouteRequirements.ReadAllUsers]: {
    roles: [],
    permissions: [Permission.READ_ALL_USERS],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
  },
  [RouteRequirements.FindOneByEmail]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
  },
  [RouteRequirements.FindOneByUuid]: {
    roles: [],
    permissions: [Permission.READ_ONE_USER, Permission.READ_OWN_USER],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
  },
  [RouteRequirements.FindOne]: {
    roles: [Role.Admin],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
  },
  [RouteRequirements.CreateUser]: {
    // Assuming no specific role or permission needed for creation
    roles: [],
    permissions: [],
    guards: [],
  },
  [RouteRequirements.UpdateUser]: {
    roles: [],
    permissions: [Permission.UPDATE_OWN_USER, Permission.UPDATE_ONE_USER],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
  },
  [RouteRequirements.SoftDelete]: {
    roles: [Role.Admin, Role.Mod],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
  },
  [RouteRequirements.ActivateUser]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
  },
  [RouteRequirements.LoginUser]: {
    // Assuming no guards for login
    roles: [],
    permissions: [],
    guards: [],
  },
  // ... other route mappings as needed
};

