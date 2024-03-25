import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { FAVS_TABLE_ID } from '../lib/const/const';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'beforeExit' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    const favorites = await this.favorites.findUnique({
      where: { id: FAVS_TABLE_ID },
    });

    if (!favorites) {
      await this.favorites.create({
        data: { id: FAVS_TABLE_ID },
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => app.close());
  }
}
