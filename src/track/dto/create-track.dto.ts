import { IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  // TODO: create decorator to handle uuid | null ??
  artistId: string | null;

  albumId: string | null;

  @IsNumber()
  duration: number;
}
