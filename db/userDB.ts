import { DB } from './types/interfaces';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { User } from '../src/user/entities/user.entity';
import { DBTable } from '../types/types';

class UserDB implements DB<User> {
  #table: DBTable<User> = {};

  findById(id: string): User | null {
    return this.#table[id];
  }

  findMany() {
    return Object.values(this.#table);
  }

  create({ login, password }: CreateUserDto): User | null {
    const user = new User(login, password);
    this.#table[user.id] = user;
    return user;
  }

  delete(id: string): User | null {
    const toDeleteUser = this.#table[id];

    if (!toDeleteUser) return null;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(([, user]) => user !== toDeleteUser),
    );

    return toDeleteUser;
  }

  update(id: string, dto: UpdateUserDto): User | null {
    const user = this.#table[id];
    user?.update(dto);
    return user;
  }
}

export default new UserDB();
