import { Track } from '../../src/track/entities/track.entity';
import { DBTable } from '../../types/types';
import TrackDB from '../trackDB';
import { FavoriteDB } from '../types/interfaces';

class FavoriteTrackDB implements FavoriteDB<Track> {
  #table: DBTable<Track> = {};

  findMany(): Track[] {
    return <Track[]>Object.values(this.#table);
  }

  create(id: string): Track | undefined {
    const track = TrackDB.findById(id);

    if (!track) return undefined;

    this.#table[id] = track;
    return track;
  }

  delete(id: string): Track | undefined {
    const toDeleteTrack = this.#table[id];

    if (!toDeleteTrack) return undefined;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, track]) => track !== toDeleteTrack,
      ),
    );

    return toDeleteTrack;
  }
}

export default new FavoriteTrackDB();
