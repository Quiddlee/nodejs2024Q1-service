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

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { errorMessage } from '../lib/const/const';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);
    if (!album) throw new NotFoundException(errorMessage.ALBUM_NOT_FOUND);
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = this.albumService.update(id, updateAlbumDto);

    if (!updatedAlbum)
      throw new NotFoundException(errorMessage.ALBUM_NOT_FOUND);

    return updatedAlbum;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.remove(id);
    if (!album) throw new NotFoundException(errorMessage.ARTIST_NOT_FOUND);
    return album;
  }
}
