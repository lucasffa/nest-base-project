import { Role } from './roles.enum';
import { Permission } from './permissions.enum';
import { Guards } from './guards.enum';

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
  UpdateByUuid = 'UpdateByUuid',
}

export const RouteRequirementDetails = {
  [RouteRequirements.SoftDeleteByUuid]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: [],
  },
  [RouteRequirements.ChangeActivationStatusByUuid]: {
    roles: [],
    permissions: [Permission.TOGGLE_ONE_USER_STATUS, Permission.TOGGLE_OWN_USER_STATUS],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
    fields: ['uuid', 'name', 'email', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt'],
  },
  [RouteRequirements.ReadAllUsers]: {
    roles: [],
    permissions: [Permission.READ_ALL_USERS],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
    fields: ['uuid', 'name', 'email', 'role', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt'],
  },
  [RouteRequirements.FindOneByEmail]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: ['uuid', 'name', 'email', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt'],
  },
  [RouteRequirements.FindOneByUuid]: {
    roles: [],
    permissions: [Permission.READ_ONE_USER, Permission.READ_OWN_USER],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
    fields: ['uuid', 'name', 'email', 'isActive', 'lastLoginAt'],
  },
  [RouteRequirements.FindOne]: {
    roles: [Role.Admin],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: ['uuid', 'name', 'email', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt', 'lastLoginAt', 'role', 'createdAt', 'updatedAt'],
  },
  [RouteRequirements.CreateUser]: {
    roles: [],
    permissions: [],
    guards: [],
    fields: ['uuid', 'name', 'email', 'createdAt', 'role'],
  },
  [RouteRequirements.UpdateUser]: {
    roles: [],
    permissions: [Permission.UPDATE_OWN_USER, Permission.UPDATE_ONE_USER],
    guards: [Guards.JwtAuthGuard, Guards.PermissionsGuard],
    fields: ['uuid', 'name', 'email', 'isActive'],
  },
  [RouteRequirements.UpdateByUuid]: {
    roles: [],
    permissions: [Permission.UPDATE_OWN_USER, Permission.UPDATE_ONE_USER],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: ['uuid', 'name', 'email', 'isActive'],
  },
  [RouteRequirements.SoftDelete]: {
    roles: [Role.Admin, Role.Mod],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: [],
  },
  [RouteRequirements.ActivateUser]: {
    roles: [Role.Admin, Role.Mod, Role.Helper],
    permissions: [],
    guards: [Guards.JwtAuthGuard, Guards.RolesGuard],
    fields: ['uuid', 'name', 'email', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt'],
  },
  [RouteRequirements.LoginUser]: {
    roles: [],
    permissions: [],
    guards: [],
    fields: ['uuid', 'name', 'email', 'isActive', 'isDeleted', 'deletedAt', 'updatedAt', 'lastLoginAt', 'role'],
  },
};