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
          author_id: music.getAuthorId(),
          file: music.getFile(),
          album: music.getAlbum()
        })
        .into(MusicDatabase.MUSIC_TABLE);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }  

  public async getGenresIdsByNames(genres: string[]): Promise<string[]> {
    try{
        const genresIds = await this.getConnection()
          .select("id")
          .from(MusicDatabase.GENRE_TABLE)
          .whereIn("genre", genres)
        
        return genresIds  
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
}

  public async insertGenresToMusic(genresIds: any[], musicId: string): Promise<void> {
      try { 
          const musicGenres = genresIds.map((item) => {
              return {
                  genre_id: item.id,
                  music_id: musicId
              }
          })
          await this.getConnection()
            .insert(musicGenres)
            .into(MusicDatabase.MUSIC_GENRE_TABLE)
      } catch (error) {
          throw new Error(error.sqlMessage || error.message);
      }
  }
}

