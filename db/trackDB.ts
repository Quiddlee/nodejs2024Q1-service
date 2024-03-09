import { DB } from './types/interfaces';
import { CreateTrackDto } from '../src/track/dto/create-track.dto';
import { UpdateTrackDto } from '../src/track/dto/update-track.dto';
import { Track } from '../src/track/entities/track.entity';
import { DBTable } from '../types/types';

class TrackDB implements DB<Track> {
  #table: DBTable<Track> = {};

  findByArtistId(id: string): Track | undefined {
    return Object.values(this.#table).find((track) => track?.artistId === id);
  }

  findByAlbumById(id: string): Track | undefined {
    return Object.values(this.#table).find((track) => track?.albumId === id);
  }

  deleteArtist(id: string) {
    const track = this.findByArtistId(id);
    if (track) track.artistId = null;
  }

  deleteAlbum(id: string) {
    const track = this.findByAlbumById(id);
    if (track) track.albumId = null;
  }

  findById(id: string): Track | undefined {
    return this.#table[id];
  }

  findMany(): Track[] {
    return <Track[]>Object.values(this.#table);
  }

  create({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const track = new Track(name, duration, artistId, albumId);
    this.#table[track.id] = track;
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

  update(id: string, dto: UpdateTrackDto): Track | undefined {
    const track = this.#table[id];

    if (!track) return undefined;

    const newTrack = { ...track, ...dto };
    this.#table[id] = newTrack;
    return newTrack;
  }
}

export default new TrackDB();
