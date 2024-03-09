import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.databaseService.album.create(createAlbumDto);
  }

  findAll() {
    return this.databaseService.album.findMany();
  }

  findOne(id: string) {
    return this.databaseService.album.findById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.databaseService.album.update(id, updateAlbumDto);
  }

  remove(id: string) {
    this.databaseService.track.deleteAlbum(id);
    return this.databaseService.album.delete(id);
  }
}
