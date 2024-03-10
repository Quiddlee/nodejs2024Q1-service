import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  login: string;

  @MinLength(8)
  @MaxLength(100)
  @IsString()
  password: string;
}
