import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateAlbumDto {
  @MinLength(2)
  @IsString()
  name: string;

  @Min(0)
  @IsInt()
  year: number;

  artistId: string | null;
}
