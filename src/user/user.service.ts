import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async update(id: string, { newPassword }: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: { increment: 1 },
        },
      });
    } catch (e) {
      return null;
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }
}
