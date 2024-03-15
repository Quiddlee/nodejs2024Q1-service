import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prismaService.artist.create({ data: createArtistDto });
  }

  findAll() {
    return this.prismaService.artist.findMany();
  }

  findOne(id: string) {
    return this.prismaService.artist.findUnique({ where: { id } });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prismaService.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    // this.prismaService.favorite.artist.delete(id);
    const artistTracks = await this.prismaService.track.findMany({
      where: { artistId: id },
    });

    const artistAlbums = await this.prismaService.album.findMany({
      where: { artistId: id },
    });

    // TODO: remove artist from favorites
    // this.prismaService.favorites.delete({where:{artists:{has:{}}}});

    // Delete artist id for all artist's albums
    artistAlbums.forEach((album) =>
      this.prismaService.track.update({
        where: { id: album.id },
        data: { artistId: null },
      }),
    );

    // Delete artist id for all artist's tracks
    artistTracks.forEach((track) =>
      this.prismaService.track.update({
        where: { id: track.id },
        data: { artistId: null },
      }),
    );

    return this.prismaService.artist.delete({ where: { id } });
  }
}
