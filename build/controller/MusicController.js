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
exports.MusicController = void 0;
const CreateMusicBusiness_1 = require("../business/CreateMusicBusiness");
const MusicDatabase_1 = require("../data/MusicDatabase");
const Authenticator_1 = require("../services/Authenticator");
const IdGenerator_1 = require("../services/IdGenerator");
const BaseDatabase_1 = require("../data/BaseDatabase");
class MusicController {
    postMusic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const musicBusiness = new CreateMusicBusiness_1.CreateMusicBusiness(new MusicDatabase_1.MusicDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
                const token = req.headers.authorization;
                const { title, file, genres, album } = req.body;
                const postData = {
                    title,
                    file,
                    genres,
                    album
                };
                yield musicBusiness.execute(postData, token);
                res.sendStatus(201);
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.MusicController = MusicController;
