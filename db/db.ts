import AlbumDB from './albumDB';
import ArtistDB from './ArtistDB';
import TrackDB from './trackDB';
import UserDB from './userDB';

export class DB {
  public user = UserDB;

  public track = TrackDB;

  public artist = ArtistDB;

  public album = AlbumDB;
}
