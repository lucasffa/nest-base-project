import { Permission } from './permissions.enum';


export enum Role {
    User = 'user',
    Helper = 'helper',
    Mod = 'mod',
    Admin = 'admin',

  }
  
export const rolePermissions = {
    [Role.User]: [
      Permission.READ_OWN_USER,
      Permission.READ_ONE_USER,
      Permission.UPDATE_OWN_USER,
      Permission.TOGGLE_OWN_USER_STATUS,
      Permission.DELETE_OWN_USER,
    ],
    [Role.Helper]: [
      Permission.READ_OWN_USER,
      Permission.READ_ONE_USER,
      Permission.READ_ALL_USERS,
      Permission.UPDATE_OWN_USER,
      Permission.TOGGLE_OWN_USER_STATUS,
      Permission.TOGGLE_ONE_USER_STATUS,
    ],
    [Role.Mod]: [
      Permission.READ_OWN_USER,
      Permission.READ_ONE_USER,
      Permission.READ_ALL_USERS,
      Permission.UPDATE_OWN_USER,
      Permission.UPDATE_ONE_USER,
      Permission.TOGGLE_OWN_USER_STATUS,
      Permission.TOGGLE_ONE_USER_STATUS,
      Permission.DELETE_ONE_USER,
    ],
    [Role.Admin]: [
      Permission.READ_OWN_USER,
      Permission.READ_ONE_USER,
      Permission.READ_ALL_USERS,
      Permission.UPDATE_OWN_USER,
      Permission.UPDATE_ONE_USER,
      Permission.TOGGLE_OWN_USER_STATUS,
      Permission.TOGGLE_ONE_USER_STATUS,
      Permission.DELETE_ONE_USER,
    ],
  };