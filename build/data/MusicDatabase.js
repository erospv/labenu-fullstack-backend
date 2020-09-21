"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class MusicDatabase extends BaseDatabase_1.BaseDatabase {
    createMusic(music) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    id: music.getId(),
                    title: music.getTitle(),
                    author_id: music.getAuthorId(),
                    file: music.getFile(),
                    album: music.getAlbum()
                })
                    .into(MusicDatabase.MUSIC_TABLE);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    getGenresIdsByNames(genres) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const genresIds = yield this.getConnection()
                    .select("id")
                    .from(MusicDatabase.GENRE_TABLE)
                    .whereIn("genre", genres);
                return genresIds;
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
    insertGenresToMusic(genresIds, musicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const musicGenres = genresIds.map((item) => {
                    return {
                        genre_id: item.id,
                        music_id: musicId
                    };
                });
                yield this.getConnection()
                    .insert(musicGenres)
                    .into(MusicDatabase.MUSIC_GENRE_TABLE);
            }
            catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
        });
    }
}
exports.MusicDatabase = MusicDatabase;
MusicDatabase.MUSIC_TABLE = "music";
MusicDatabase.GENRE_TABLE = "genre";
MusicDatabase.MUSIC_GENRE_TABLE = "music_genre";
