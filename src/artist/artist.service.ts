import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.databaseService.createArtist(createArtistDto);
  }

  findAll() {
    return this.databaseService.findArtistMany();
  }

  findOne(id: string) {
    return this.databaseService.findArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.databaseService.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.databaseService.deleteArtist(id);
  }
}
