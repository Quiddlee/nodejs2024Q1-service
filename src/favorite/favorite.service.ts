import { Injectable } from '@nestjs/common';

import exclude from '../lib/shared/exclude';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTrack(id: string) {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: { favoritesId: 'favs' },
      });
    } catch (e) {
      return null;
    }
  }

  async createAlbum(id: string) {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: { favoritesId: 'favs' },
      });
    } catch (e) {
      return null;
    }
  }

  async createArtist(id: string) {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: { favoritesId: 'favs' },
      });
    } catch (e) {
      return null;
    }
  }

  async findAll() {
    const data = await this.prismaService.favorites.findMany({
      where: { id: 'favs' },
      select: { artists: true, albums: true, tracks: true },
    });

    const clearData = {
      albums: data['0']?.albums.map((el) => exclude(el, ['favoritesId'])),
      artists: data['0']?.artists.map((el) => exclude(el, ['favoritesId'])),
      tracks: data['0']?.tracks.map((el) => exclude(el, ['favoritesId'])),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return { artists: [], albums: [], tracks: [], ...clearData };
  }

  async removeTrack(id: string) {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (e) {
      return null;
    }
  }

  async removeAlbum(id: string) {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (e) {
      return null;
    }
  }

  async removeArtist(id: string) {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (e) {
      return null;
    }
  }
}
