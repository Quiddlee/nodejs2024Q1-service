import { DB } from './types/interfaces';
import { CreateArtistDto } from '../src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../src/artist/dto/update-artist.dto';
import { Artist } from '../src/artist/entities/artist.entity';
import { DBTable } from '../types/types';

class ArtistDB implements DB<Artist> {
  #table: DBTable<Artist> = {};

  findById(id: string): Artist | null {
    return this.#table[id];
  }

  findMany() {
    return Object.values(this.#table);
  }

  create({ name, grammy }: CreateArtistDto): Artist | null {
    const artist = new Artist(name, grammy);
    this.#table[artist.id] = artist;
    return artist;
  }

  delete(id: string): Artist | null {
    const toDeleteArtist = this.#table[id];

    if (!toDeleteArtist) return toDeleteArtist;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, artist]) => artist !== toDeleteArtist,
      ),
    );

    return toDeleteArtist;
  }

  update(id: string, dto: UpdateArtistDto): Artist | null {
    const artist = this.#table[id];

    if (!artist) return null;

    const newArtist = { ...artist, ...dto };
    this.#table[id] = newArtist;
    return newArtist;
  }
}

export default new ArtistDB();
