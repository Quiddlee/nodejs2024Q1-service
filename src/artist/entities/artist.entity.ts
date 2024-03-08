import * as uuid from 'uuid';

export class Artist {
  id: string;

  name: string;

  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuid.v4();
    this.name = name;
    this.grammy = grammy;
  }
}
