import { IsUUID } from 'class-validator';

export class CreateFavoriteArtistDto {
  @IsUUID()
  id: string;
}
