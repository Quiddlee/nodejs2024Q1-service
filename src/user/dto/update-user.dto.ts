import { IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  @IsString()
  oldPassword: string;

  @MinLength(3)
  @IsString()
  newPassword: string;
}
