import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';
import { errorMessage } from '../lib/const/const';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    const track = this.trackService.create(createTrackDto);
    return track;
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);
    if (!track) throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = this.trackService.update(id, updateTrackDto);

    if (!updatedTrack)
      throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);

    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.remove(id);
    if (!track) throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }
}
