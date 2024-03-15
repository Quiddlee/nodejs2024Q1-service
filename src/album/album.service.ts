import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.prismaService.album.create({ data: createAlbumDto });
  }

  findAll() {
    return this.prismaService.album.findMany();
  }

  findOne(id: string) {
    return this.prismaService.album.findUnique({ where: { id } });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.prismaService.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    const albumTracks = await this.prismaService.track.findMany({
      where: { albumId: id },
    });

    albumTracks.forEach((track) =>
      this.prismaService.track.update({
        where: { id: track.id },
        data: { albumId: null },
      }),
    );

    // TODO: delete from favorites
    // this.prismaService.favorite.album.delete(id);
    return this.prismaService.album.delete({ where: { id } });
  }
}
