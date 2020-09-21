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
exports.CreateMusicBusiness = void 0;
const Music_1 = require("../model/Music");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
const UnauthorizedError_1 = require("../error/UnauthorizedError");
class CreateMusicBusiness {
    constructor(musicDatabase, idGenerator, authenticator) {
        this.musicDatabase = musicDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    execute(input, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw new UnauthorizedError_1.UnauthorizedError("User must be logged");
            }
            if (!input.title || !input.file || input.genres.length < 1) {
                throw new InvalidParameterError_1.InvalidParameterError("Fill all the fields");
            }
            const authenticationData = this.authenticator.getData(token);
            const musicId = this.idGenerator.generate();
            const newMusic = Music_1.Music.toMusicModel({
                id: musicId,
                title: input.title,
                authorId: authenticationData.id,
                file: input.file,
                album: input.album ? input.album : "Single"
            });
            yield this.musicDatabase.createMusic(newMusic);
            const genresDB = yield this.musicDatabase.getGenresIdsByNames(input.genres);
            yield this.musicDatabase.insertGenresToMusic(genresDB, musicId);
        });
    }
}
exports.CreateMusicBusiness = CreateMusicBusiness;
