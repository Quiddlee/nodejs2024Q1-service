import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FavoriteService } from './favorite.service';
import { errorMessage } from '../lib/const/const';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UsePipes(new ValidationPipe())
  @Post('track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.favoriteService.createTrack(id);
    if (!track)
      throw new UnprocessableEntityException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Post('album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.favoriteService.createAlbum(id);
    if (!album)
      throw new UnprocessableEntityException(errorMessage.ALBUM_NOT_FOUND);
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Post('artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.favoriteService.createArtist(id);
    if (!artist)
      throw new UnprocessableEntityException(errorMessage.ARTIST_NOT_FOUND);
    return artist;
  }

  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = await this.favoriteService.removeTrack(id);
    if (!track)
      throw new UnprocessableEntityException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = await this.favoriteService.removeAlbum(id);
    if (!album)
      throw new UnprocessableEntityException(errorMessage.ALBUM_NOT_FOUND);
    return album;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = await this.favoriteService.removeArtist(id);
    if (!artist)
      throw new UnprocessableEntityException(errorMessage.ARTIST_NOT_FOUND);
    return artist;
  }
}
