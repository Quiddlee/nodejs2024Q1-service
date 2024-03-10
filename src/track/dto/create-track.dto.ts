import { IsNumber, IsString } from 'class-validator';

import { IsUUIDOrNull } from '../../lib/shared/IsUUIDOrNull.decorator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUIDOrNull()
  artistId: string | null;

  @IsUUIDOrNull()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
