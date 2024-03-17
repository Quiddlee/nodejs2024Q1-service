import { DB } from './types/interfaces';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { User } from '../src/user/entities/user.entity';
import { DBTable } from '../types/types';

class UserDB implements DB<User> {
  #table: DBTable<User> = {};

  findById(id: string): User | undefined {
    return this.#table[id];
  }

  findMany(): User[] {
    return <User[]>Object.values(this.#table);
  }

  create({ login, password }: CreateUserDto): User {
    const user = new User(login, password);
    this.#table[user.id] = user;
    return user;
  }

  delete(id: string): User | undefined {
    const toDeleteUser = this.#table[id];

    if (!toDeleteUser) return undefined;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(([, user]) => user !== toDeleteUser),
    );

    return toDeleteUser;
  }

  update(): User | undefined {
    return null as unknown as User;
  }
}

export default new UserDB();
