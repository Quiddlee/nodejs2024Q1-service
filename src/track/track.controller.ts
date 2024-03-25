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
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (!updatedTrack)
      throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.trackService.remove(id);
    if (!track) throw new NotFoundException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }
}
