/* eslint-disable @typescript-eslint/no-empty-function */

import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

type UsersTable = {
  [id: string]: User;
};

class UserDB {
  private static readonly instance: UserDB = new UserDB();

  private userTable: UsersTable = {};

  private constructor() {}

  static getInstance() {
    return UserDB.instance;
  }

  findById(id: string) {
    return this.userTable[id];
  }

  findMany() {
    return Object.values(this.userTable);
  }

  create({ login, password }: CreateUserDto) {
    const user = new User(login, password);
    this.userTable[user.id] = user;
    return user;
  }

  delete(id: string) {
    const toDeleteUser = this.userTable[id];

    if (!toDeleteUser) return toDeleteUser;

    this.userTable = Object.fromEntries(
      Object.entries(this.userTable).filter(
        ([, user]) => user !== toDeleteUser,
      ),
    );

    return toDeleteUser;
  }

  update(id: string, dto: UpdateUserDto) {
    const user = this.userTable[id];
    user?.update(dto);
    return user;
  }
}

export default UserDB.getInstance();
