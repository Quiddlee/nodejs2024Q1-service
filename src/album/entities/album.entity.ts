import * as uuid from 'uuid';

export class Album {
  id: string;

  name: string;

  year: number;

  artistId: string | null;

  constructor(name: string, year: number, artistId: string) {
    this.id = uuid.v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
