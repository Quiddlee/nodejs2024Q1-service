import { IsUUID } from 'class-validator';

export class CreateFavoriteAlbumDto {
  @IsUUID()
  id: string;
}
