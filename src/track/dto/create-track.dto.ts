import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

import { IsUUIDOrNull } from '../../lib/shared/IsUUIDOrNull.decorator';

export class CreateTrackDto {
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  name: string;

  @IsUUIDOrNull()
  artistId: string | null;

  @IsUUIDOrNull()
  albumId: string | null;

  @Min(0)
  @IsInt()
  duration: number;
}
