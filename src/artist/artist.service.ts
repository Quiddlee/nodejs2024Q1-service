import { Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prismaService.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return this.prismaService.artist.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.artist.findUnique({ where: { id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (e) {
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.artist.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
