import { IsInt, IsString, Min, MinLength } from 'class-validator';

import { IsUUIDOrNull } from '../../lib/shared/IsUUIDOrNull.decorator';

export class CreateAlbumDto {
  @MinLength(2)
  @IsString()
  name: string;

  @Min(0)
  @IsInt()
  year: number;

  @IsUUIDOrNull()
  artistId: string | null;
}
