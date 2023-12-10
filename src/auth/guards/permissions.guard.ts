import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../permissions.enum';
import { rolePermissions } from '../roles.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<Permission[]>(PERMISSIONS_KEY, context.getHandler());
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Handle a single role or an array of roles
    const roles = Array.isArray(user.role) ? user.role : [user.role];

    return requiredPermissions.some((permission) =>
      roles.some((role) => rolePermissions[role]?.includes(permission))
    );
  }
}