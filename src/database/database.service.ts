import { Injectable } from '@nestjs/common';

import { DB } from '../../db/db';

// TODO: change to use Prisma client
@Injectable()
export class DatabaseService extends DB {}
