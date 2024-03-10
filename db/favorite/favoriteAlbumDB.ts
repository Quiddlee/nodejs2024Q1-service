import { Album } from '../../src/album/entities/album.entity';
import { DBTable } from '../../types/types';
import AlbumDB from '../albumDB';
import { FavoriteDB } from '../types/interfaces';

class FavoriteAlbumDB implements FavoriteDB<Album> {
  #table: DBTable<Album> = {};

  findMany(): Album[] {
    return <Album[]>Object.values(this.#table);
  }

  create(id: string): Album | undefined {
    const album = AlbumDB.findById(id);

    if (!album) return undefined;

    this.#table[id] = album;
    return album;
  }

  delete(id: string): Album | undefined {
    const toDeleteAlbum = this.#table[id];

    if (!toDeleteAlbum) return undefined;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, album]) => album !== toDeleteAlbum,
      ),
    );

    return toDeleteAlbum;
  }
}

export default new FavoriteAlbumDB();
