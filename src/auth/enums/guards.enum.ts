import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';

export const Guards = {
  JwtAuthGuard: JwtAuthGuard,
  RolesGuard: RolesGuard,
  PermissionsGuard: PermissionsGuard,
};