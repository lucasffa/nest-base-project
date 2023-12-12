import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Role } from '../auth/enums/roles.enum';
import { Permission } from '../auth/enums/permissions.enum';

@Injectable()
export class PermissionChecker {
  constructor(  
    @Inject('ROLE_PERMISSIONS') private rolePermissions: Record<Role, Permission[]>
    ) {}

  hasPermission(requesterRole: Role, ...requiredPermissions: Permission[]): boolean {
    const requesterPermissions = this.rolePermissions[requesterRole];
    return requiredPermissions.some(permission => requesterPermissions.includes(permission));
  }

  canPerformAction(requesterUuid: string, targetUuid: string, requesterRole: Role, ...requiredPermissions: Permission[]): boolean {
    const canPerformOnAny = this.hasPermission(requesterRole, Permission.READ_ALL_USERS, Permission.UPDATE_ONE_USER, Permission.TOGGLE_ONE_USER_STATUS, Permission.DELETE_ONE_USER);
    const canPerformOnOwn = this.hasPermission(requesterRole, ...requiredPermissions) && requesterUuid === targetUuid;
    return canPerformOnAny || canPerformOnOwn;
  }
}