import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.createTrack(createTrackDto);
  }

  findAll() {
    return this.databaseService.findTrackMany();
  }

  findOne(id: string) {
    return this.databaseService.findTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.databaseService.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.databaseService.deleteTrack(id);
  }
}
