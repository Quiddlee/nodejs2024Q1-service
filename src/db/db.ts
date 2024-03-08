import { DBTable } from '../../types/types';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { Track } from '../track/entities/track.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User } from '../user/entities/user.entity';

export class DB {
  private userTable: DBTable<User> = {};

  private trackTable: DBTable<Track> = {};

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
}
