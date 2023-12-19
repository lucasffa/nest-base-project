import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'User name' })
    name: string;

    @IsEmail()
    @ApiProperty({ example: 'john.doe@email.com', description: 'User email'})
    email: string;

    @IsString()
    @MinLength(8)
    @ApiProperty({ example: 'strongpassword', description: 'User password'})
    password: string;

}