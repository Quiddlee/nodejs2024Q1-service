import * as uuid from 'uuid';

export class Track {
  public id: string; // uuid v4

  public name: string;

  public artistId: string | null; // refers to Artist

  public albumId: string | null; // refers to Album

  public duration: number; // integer number

  constructor(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
