import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @IsString()
  login: string;

  @MinLength(3)
  @IsString()
  password: string;
}
