import { DB } from './types/interfaces';
import { CreateTrackDto } from '../src/track/dto/create-track.dto';
import { UpdateTrackDto } from '../src/track/dto/update-track.dto';
import { Track } from '../src/track/entities/track.entity';
import { DBTable } from '../types/types';

class TrackDB implements DB<Track> {
  #table: DBTable<Track> = {};

  findById(id: string): Track | null {
    return this.#table[id];
  }

  findMany(): Track[] {
    return Object.values(this.#table);
  }

  create({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const track = new Track(name, duration, artistId, albumId);
    this.#table[track.id] = track;
    return track;
  }

  delete(id: string): Track | null {
    const toDeleteTrack = this.#table[id];

    if (!toDeleteTrack) return null;

    this.#table = Object.fromEntries(
      Object.entries(this.#table).filter(
        ([, track]) => track !== toDeleteTrack,
      ),
    );

    return toDeleteTrack;
  }

  update(id: string, dto: UpdateTrackDto): Track | null {
    const track = this.#table[id];

    if (!track) return null;

    const newTrack = { ...track, ...dto };
    this.#table[id] = newTrack;
    return newTrack;
  }
}

export default new TrackDB();
