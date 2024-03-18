import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTrack(id: string) {
    const favorites = await this.prismaService.favorites.findUnique({
      where: { id: 'favs' },
    });

    if (!favorites) {
      await this.prismaService.favorites.create({
        data: { id: 'favs' },
      });
    }

    return this.prismaService.track.update({
      where: { id },
      data: { favoritesId: 'favs' },
    });
  }

  async createAlbum(id: string) {
    const favorites = await this.prismaService.favorites.findUnique({
      where: { id: 'favs' },
    });

    if (!favorites) {
      await this.prismaService.favorites.create({
        data: { id: 'favs' },
      });
    }

    return this.prismaService.album.update({
      where: { id },
      data: { favoritesId: 'favs' },
    });
  }

  async createArtist(id: string) {
    const favorites = await this.prismaService.favorites.findUnique({
      where: { id: 'favs' },
    });

    if (!favorites) {
      await this.prismaService.favorites.create({
        data: { id: 'favs' },
      });
    }

    return this.prismaService.artist.update({
      where: { id },
      data: { favoritesId: 'favs' },
    });
  }

  async findAll() {
    return this.prismaService.favorites.findMany({
      where: { id: 'favs' },
      select: { artists: true, albums: true, tracks: true },
    });
  }

  removeTrack(id: string) {
    return this.prismaService.track.update({
      where: { id },
      data: { favoritesId: null },
    });
  }

  removeAlbum(id: string) {
    return this.prismaService.album.update({
      where: { id },
      data: { favoritesId: null },
    });
  }

  removeArtist(id: string) {
    return this.prismaService.artist.update({
      where: { id },
      data: { favoritesId: null },
    });
  }
}
