import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';

export class CreateAlbumDto {
  @MinLength(2)
  @IsString()
  name: string;

  @Min(0)
  @IsInt()
  year: number;

  // TODO: create custom decorator with uuid | null?
  @IsNotEmpty()
  artistId: string | null;
}
