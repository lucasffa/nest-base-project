import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role } from '../../auth/enums/roles.enum'; 


export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

}
