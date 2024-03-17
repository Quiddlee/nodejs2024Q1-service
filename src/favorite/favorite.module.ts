import { Module } from '@nestjs/common';

import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { DatabaseModule } from '../database/database.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [DatabaseModule, PrismaModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
