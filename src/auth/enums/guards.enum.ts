import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { RateLimitingGuard } from 'src/common/guards/rate-limiting.guard';

export const Guards = {
  JwtAuthGuard: JwtAuthGuard,
  RolesGuard: RolesGuard,
  PermissionsGuard: PermissionsGuard,
  RateLimitingGuard: RateLimitingGuard,
};