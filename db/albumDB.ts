import { DB } from './types/interfaces';
import { CreateAlbumDto } from '../src/album/dto/create-album.dto';
import { Album } from '../src/album/entities/album.entity';
import { UpdateArtistDto } from '../src/artist/dto/update-artist.dto';
import { DBTable } from '../types/types';

class AlbumDB implements DB<Album> {
  #table: DBTable<Album> = {};

  findById(id: string): Album | null {
    return this.#table[id];
  }

  findMany() {
    return Object.values(this.#table);
  }

  create({ name, artistId, year }: CreateAlbumDto): Album | null {
    const artist = new Album(name, year, artistId);
    this.#table[artist.id] = artist;
    return artist;
  }

  delete(id: string): Album | null {
    const toDeleteAlbum = this.#table[id];

    if (!toDeleteAlbum) return toDeleteAlbum;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, artist]) => artist !== toDeleteAlbum,
      ),
    );

    return toDeleteAlbum;
  }

  update(id: string, dto: UpdateArtistDto): Album | null {
    const artist = this.#table[id];

    if (!artist) return null;

    const newArtist = { ...artist, ...dto };
    this.#table[id] = newArtist;
    return newArtist;
  }
}

export default new AlbumDB();
