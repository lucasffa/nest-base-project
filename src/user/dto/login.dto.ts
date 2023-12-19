import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;
}