import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(4)
  @MaxLength(100)
  @IsString()
  oldPassword: string;

  @MinLength(4)
  @MaxLength(100)
  @IsString()
  newPassword: string;
}
