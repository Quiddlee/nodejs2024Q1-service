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
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.favoriteService.createTrack(id);
    if (!track)
      throw new UnprocessableEntityException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @UsePipes(new ValidationPipe())
  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.favoriteService.createAlbum(id);
    if (!album)
      throw new UnprocessableEntityException(errorMessage.ALBUM_NOT_FOUND);
    return album;
  }

  @UsePipes(new ValidationPipe())
  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.favoriteService.createArtist(id);
    if (!artist)
      throw new UnprocessableEntityException(errorMessage.ARTIST_NOT_FOUND);
    return artist;
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.favoriteService.removeTrack(id);
    if (!track)
      throw new UnprocessableEntityException(errorMessage.TRACK_NOT_FOUND);
    return track;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.favoriteService.removeAlbum(id);
    if (!album)
      throw new UnprocessableEntityException(errorMessage.ALBUM_NOT_FOUND);
    return album;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.favoriteService.removeArtist(id);
    if (!artist)
      throw new UnprocessableEntityException(errorMessage.ARTIST_NOT_FOUND);
    return artist;
  }
}
