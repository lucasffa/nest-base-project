import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';

// Simplified guard references
export const Guards = {
  JwtAuthGuard: JwtAuthGuard,
  RolesGuard: RolesGuard,
  PermissionsGuard: PermissionsGuard,
};
