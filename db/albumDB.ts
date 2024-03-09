import { DB } from './types/interfaces';
import { CreateAlbumDto } from '../src/album/dto/create-album.dto';
import { Album } from '../src/album/entities/album.entity';
import { UpdateArtistDto } from '../src/artist/dto/update-artist.dto';
import { DBTable } from '../types/types';

class AlbumDB implements DB<Album> {
  #table: DBTable<Album> = {};

  findById(id: string): Album | undefined {
    return this.#table[id];
  }

  findByArtistId(id: string): Album | undefined {
    return Object.values(this.#table).find((album) => album?.artistId === id);
  }

  deleteArtist(id: string) {
    const album = this.findByArtistId(id);
    if (album) album.artistId = null;
  }

  findMany(): Album[] {
    return <Album[]>Object.values(this.#table);
  }

  create({ name, artistId, year }: CreateAlbumDto): Album | undefined {
    const artist = new Album(name, year, artistId);
    this.#table[artist.id] = artist;
    return artist;
  }

  delete(id: string): Album | undefined {
    const toDeleteAlbum = this.#table[id];

    if (!toDeleteAlbum) return undefined;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, artist]) => artist !== toDeleteAlbum,
      ),
    );

    return toDeleteAlbum;
  }

  update(id: string, dto: UpdateArtistDto): Album | undefined {
    const artist = this.#table[id];

    if (!artist) return undefined;

    const newArtist = { ...artist, ...dto };
    this.#table[id] = newArtist;
    return newArtist;
  }
}

export default new AlbumDB();
