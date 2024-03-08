import { CreateAlbumDto } from '../src/album/dto/create-album.dto';
import { Album } from '../src/album/entities/album.entity';
import { CreateArtistDto } from '../src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../src/artist/dto/update-artist.dto';
import { Artist } from '../src/artist/entities/artist.entity';
import { CreateTrackDto } from '../src/track/dto/create-track.dto';
import { UpdateTrackDto } from '../src/track/dto/update-track.dto';
import { Track } from '../src/track/entities/track.entity';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { UpdateUserDto } from '../src/user/dto/update-user.dto';
import { User } from '../src/user/entities/user.entity';
import { DBTable } from '../types/types';

export class DB {
  private userTable: DBTable<User> = {};

  private trackTable: DBTable<Track> = {};

  private artistTable: DBTable<Artist> = {};

  private albumTable: DBTable<Album> = {};

  // USER
  findUserById(id: string) {
    return this.userTable[id];
  }

  findUserMany() {
    return Object.values(this.userTable);
  }

  createUser({ login, password }: CreateUserDto) {
    const user = new User(login, password);
    this.userTable[user.id] = user;
    return user;
  }

  deleteUser(id: string) {
    const toDeleteUser = this.userTable[id];

    if (!toDeleteUser) return toDeleteUser;

    this.userTable = Object.fromEntries(
      Object.entries(this.userTable).filter(
        ([, user]) => user !== toDeleteUser,
      ),
    );

    return toDeleteUser;
  }

  updateUser(id: string, dto: UpdateUserDto) {
    const user = this.userTable[id];
    user?.update(dto);
    return user;
  }

  // TRACK
  findTrackById(id: string): Track {
    return this.trackTable[id];
  }

  findTrackMany(): Track[] {
    return Object.values(this.trackTable);
  }

  createTrack({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const track = new Track(name, duration, artistId, albumId);
    this.trackTable[track.id] = track;
    return track;
  }

  deleteTrack(id: string): Track | null {
    const toDeleteTrack = this.trackTable[id];

    if (!toDeleteTrack) return null;

    this.trackTable = Object.fromEntries(
      Object.entries(this.trackTable).filter(
        ([, track]) => track !== toDeleteTrack,
      ),
    );

    return toDeleteTrack;
  }

  updateTrack(id: string, dto: UpdateTrackDto): Track | null {
    const track = this.trackTable[id];

    if (!track) return null;

    const newTrack = { ...track, ...dto };
    this.trackTable[id] = newTrack;
    return newTrack;
  }

  // ARTIST
  findArtistById(id: string) {
    return this.artistTable[id];
  }

  findArtistMany() {
    return Object.values(this.artistTable);
  }

  createArtist({ name, grammy }: CreateArtistDto) {
    const artist = new Artist(name, grammy);
    this.artistTable[artist.id] = artist;
    return artist;
  }

  deleteArtist(id: string) {
    const toDeleteArtist = this.artistTable[id];

    if (!toDeleteArtist) return toDeleteArtist;

    this.artistTable = Object.fromEntries(
      Object.entries(this.artistTable).filter(
        ([, artist]) => artist !== toDeleteArtist,
      ),
    );

    return toDeleteArtist;
  }

  updateArtist(id: string, dto: UpdateArtistDto) {
    const artist = this.artistTable[id];

    if (!artist) return null;

    const newArtist = { ...artist, ...dto };
    this.artistTable[id] = newArtist;
    return newArtist;
  }

  // ALBUMS
  findAlbumById(id: string) {
    return this.albumTable[id];
  }

  findAlbumMany() {
    return Object.values(this.albumTable);
  }

  createAlbum({ name, artistId, year }: CreateAlbumDto) {
    const artist = new Album(name, year, artistId);
    this.albumTable[artist.id] = artist;
    return artist;
  }

  deleteAlbum(id: string) {
    const toDeleteAlbum = this.albumTable[id];

    if (!toDeleteAlbum) return toDeleteAlbum;

    this.albumTable = Object.fromEntries(
      Object.entries(this.albumTable).filter(
        ([, artist]) => artist !== toDeleteAlbum,
      ),
    );

    return toDeleteAlbum;
  }

  updateAlbum(id: string, dto: UpdateArtistDto) {
    const artist = this.albumTable[id];

    if (!artist) return null;

    const newArtist = { ...artist, ...dto };
    this.albumTable[id] = newArtist;
    return newArtist;
  }
}
