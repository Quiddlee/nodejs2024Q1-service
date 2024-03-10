import { IsUUID } from 'class-validator';

export class CreateFavoriteTrackDto {
  @IsUUID()
  id: string;
}
