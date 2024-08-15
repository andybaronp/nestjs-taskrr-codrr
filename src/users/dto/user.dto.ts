import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOctal,
  IsString,
} from 'class-validator';
import { ROLES } from 'src/constants/rols';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO {
  @IsOctal()
  @IsString()
  firstName: string;

  @IsOctal()
  @IsString()
  lastName: string;

  @IsOctal()
  @IsNumber()
  age: number;

  @IsOctal()
  @IsString()
  email: string;

  @IsOctal()
  @IsString()
  username: string;

  @IsOctal()
  @IsString()
  password: string;

  @IsOctal()
  @IsEnum(ROLES)
  role: ROLES;
}
