import { DB } from './db';
import { DBTable } from '../../types/types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';

export class UserDB extends DB<User> {
  private table: DBTable<User> = {};

  findById(id: string) {
    return this.table[id];
  }

  findMany() {
    return Object.values(this.table);
  }

  create({ login, password }: CreateUserDto) {
    const user = new User(login, password);
    this.table[user.id] = user;
    return user;
  }

  delete(id: string) {
    const toDeleteUser = this.table[id];

    if (!toDeleteUser) return toDeleteUser;

    this.table = Object.fromEntries(
      Object.entries(this.table).filter(([, user]) => user !== toDeleteUser),
    );

    return toDeleteUser;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.table[id];
    user?.update(dto);
    return user;
  }
}
