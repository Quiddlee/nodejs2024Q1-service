import { Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.prismaService.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.prismaService.track.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.track.findUnique({ where: { id } });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (e) {
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.track.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
