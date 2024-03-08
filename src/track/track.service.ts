import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.track.create(createTrackDto);
  }

  findAll() {
    return this.databaseService.track.findMany();
  }

  findOne(id: string) {
    return this.databaseService.track.findById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.databaseService.track.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.databaseService.track.delete(id);
  }
}
