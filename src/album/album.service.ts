import { Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prismaService.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return this.prismaService.album.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.album.findUnique({ where: { id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch (e) {
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.album.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
