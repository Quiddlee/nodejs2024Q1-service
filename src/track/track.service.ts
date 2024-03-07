import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    this.databaseService.createTrack(createTrackDto);
  }

  findAll() {
    this.databaseService.findTrackMany();
  }

  findOne(id: string) {
    this.databaseService.findTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.databaseService.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    this.databaseService.deleteTrack(id);
  }
}
