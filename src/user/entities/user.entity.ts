import { Exclude } from 'class-transformer';
import * as uuid from 'uuid';

import { UpdateUserDto } from '../dto/update-user.dto';

export class User {
  public id: string;

  public version: number;

  public createdAt: number;

  public updatedAt: number;

  @Exclude()
  public password: string;

  public login: string;

  constructor(login: string, password: string) {
    this.id = uuid.v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  update({ login, password }: UpdateUserDto) {
    this.login = login;
    this.password = password;
    this.version += 1;
    this.updatedAt = Date.now();
  }
}
