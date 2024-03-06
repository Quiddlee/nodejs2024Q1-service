import { Injectable } from '@nestjs/common';

import { UserDB } from '../db/userDB';

// TODO: change to use Prisma client
@Injectable()
export class DatabaseService extends UserDB {}
