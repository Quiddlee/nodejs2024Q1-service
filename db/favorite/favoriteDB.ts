import FavoriteAlbumDB from './favoriteAlbumDB';
import FavoriteArtistDB from './favoriteArtistDB';
import FavoriteTrackDB from './favoriteTrackDB';

class FavoriteDB {
  public track = FavoriteTrackDB;

  public album = FavoriteAlbumDB;

  public artist = FavoriteArtistDB;
}

export default new FavoriteDB();
