import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly databaseService: DatabaseService) {}

  createTrack(id: string) {
    return this.databaseService.favorite.track.create(id);
  }

  createAlbum(id: string) {
    return this.databaseService.favorite.album.create(id);
  }

  createArtist(id: string) {
    return this.databaseService.favorite.artist.create(id);
  }

  findAllTracks() {
    return this.databaseService.favorite.track.findMany();
  }

  findAllAlbums() {
    return this.databaseService.favorite.album.findMany();
  }

  findAllArtists() {
    return this.databaseService.favorite.artist.findMany();
  }

  removeTrack(id: string) {
    return this.databaseService.favorite.track.delete(id);
  }

  removeAlbum(id: string) {
    return this.databaseService.favorite.album.delete(id);
  }

  removeArtist(id: string) {
    return this.databaseService.favorite.artist.delete(id);
  }
}
