import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  // TODO: create decorator to handle uuid | null ??
  @IsNotEmpty()
  artistId: string | null;

  @IsNotEmpty()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
