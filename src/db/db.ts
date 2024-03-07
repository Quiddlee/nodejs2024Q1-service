import { DBTable } from '../../types/types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';

export class DB {
  private userTable: DBTable<User> = {};

  findUserById(id: string) {
    return this.userTable[id];
  }

  findUserMany() {
    return Object.values(this.userTable);
  }

  createUser({ login, password }: CreateUserDto) {
    const user = new User(login, password);
    this.userTable[user.id] = user;
    return user;
  }

  deleteUser(id: string) {
    const toDeleteUser = this.userTable[id];

    if (!toDeleteUser) return toDeleteUser;

    this.userTable = Object.fromEntries(
      Object.entries(this.userTable).filter(
        ([, user]) => user !== toDeleteUser,
      ),
    );

    return toDeleteUser;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const user = this.userTable[id];
    user?.update(dto);
    return user;
  }
}
