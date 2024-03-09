import { Artist } from '../../src/artist/entities/artist.entity';
import { DBTable } from '../../types/types';
import ArtistDB from '../artistDB';
import { FavoriteDB } from '../types/interfaces';

class FavoriteArtistDB implements FavoriteDB<Artist> {
  #table: DBTable<Artist> = {};

  findMany(): Artist[] {
    return <Artist[]>Object.values(this.#table);
  }

  create(id: string): Artist | undefined {
    const artist = ArtistDB.findById(id);

    if (!artist) return undefined;

    this.#table[id] = artist;
    return artist;
  }

  delete(id: string): Artist | undefined {
    const toDeleteArtist = this.#table[id];

    if (!toDeleteArtist) return undefined;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, artist]) => artist !== toDeleteArtist,
      ),
    );

    return toDeleteArtist;
  }
}

export default new FavoriteArtistDB();
