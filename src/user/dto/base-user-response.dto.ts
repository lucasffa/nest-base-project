import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResponseDto {

    @ApiProperty({ type: String, description: 'User UUID' })
    uuid?: string;

    @ApiProperty({ type: String, description: 'User name' })
    name?: string;

    @ApiProperty({ type: String, description: 'User email' })
    email?: string;

    @ApiProperty({ type: String, description: 'User role' })
    role?: string;

    @ApiProperty({ type: Boolean, description: 'Whether user is active' })
    isActive?: boolean;

    @ApiProperty({ type: Boolean, description: 'Whether user is deleted' })
    isDeleted?: boolean;
  
    @ApiProperty({ type: Date, description: 'When user was deleted' })
    deletedAt?: Date;

    @ApiProperty({ type: Date, description: 'When user was last updated' })
    updatedAt?: Date;

    @ApiProperty({ type: Date, description: 'When user was created' })
    createdAt?: Date;

    @ApiProperty({ type: Date, description: 'When user last logged in' })
    lastLoginAt?: Date;

    constructor(user: any, fields: string[]) {
      fields.forEach(field => {
        if (user[field] !== undefined) {
          this[field] = user[field];
        }
      });
    }
}