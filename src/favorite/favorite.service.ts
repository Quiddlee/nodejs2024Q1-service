import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  createTrack(id: string) {
    return this.prismaService.track.update({
      where: { id },
      data: { favoritesId: 'favs' },
    });
  }

  createAlbum(id: string) {
    return this.databaseService.favorite.album.create(id);
  }

  createArtist(id: string) {
    return this.databaseService.favorite.artist.create(id);
  }

  async findAll() {
    const data = await this.prismaService.favorites.findUnique({
      where: { id: 'favs' },
      select: { artists: true, albums: true, tracks: true },
    });

    console.log(data);

    return data;
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
