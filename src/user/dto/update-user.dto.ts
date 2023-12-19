import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'john.doe@email.com', description: 'User email'})
  email?: string;
}