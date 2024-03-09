import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.databaseService.artist.create(createArtistDto);
  }

  findAll() {
    return this.databaseService.artist.findMany();
  }

  findOne(id: string) {
    return this.databaseService.artist.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.databaseService.artist.update(id, updateArtistDto);
  }

  remove(id: string) {
    this.databaseService.track.deleteArtist(id);
    this.databaseService.album.deleteArtist(id);
    return this.databaseService.artist.delete(id);
  }
}
