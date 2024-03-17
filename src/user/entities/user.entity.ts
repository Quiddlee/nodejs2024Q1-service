import { Exclude } from 'class-transformer';
import * as uuid from 'uuid';

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
    this.createdAt = 123;
    this.updatedAt = this.createdAt;
  }
}
