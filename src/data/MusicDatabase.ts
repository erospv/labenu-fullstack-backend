import { BaseDatabase } from "./BaseDatabase";
import { Music } from "../model/Music";

export class MusicDatabase extends BaseDatabase {

  private static MUSIC_TABLE = "music";
  private static GENRE_TABLE = "genre";
  private static MUSIC_GENRE_TABLE = "music_genre";

  public async createMusic(music: Music): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: music.getId(),
          title: music.getTitle(),
          author_id: music.getauthorId(),
          file: music.getFile(),
          album_id: music.getAlbumId()
        })
        .into(MusicDatabase.MUSIC_TABLE);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }  

  public async insertGenresToMusic(genres: string[] ): Promise<void> {
      try {
          const musicGenres = genres.map()
          await this.getConnection()
          .insert(genres)
      } catch (error) {
          throw new Error(error.sqlMessage || error.message);
      }
  }



}

