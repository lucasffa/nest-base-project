import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PermissionChecker } from '../helpers/permission-checker';
import { rolePermissions } from './enums/roles.enum';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    JwtStrategy,
    PermissionChecker,
    { provide: 'ROLE_PERMISSIONS', useValue: rolePermissions },
  ],
  exports: [PermissionChecker]
})
export class AuthModule {}