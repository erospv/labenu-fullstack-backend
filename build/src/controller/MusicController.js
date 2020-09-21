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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
var CreateMusicBusiness_1 = require("../business/CreateMusicBusiness");
var MusicDatabase_1 = require("../data/MusicDatabase");
var Authenticator_1 = require("../services/Authenticator");
var IdGenerator_1 = require("../services/IdGenerator");
var BaseDatabase_1 = require("../data/BaseDatabase");
var MusicController = /** @class */ (function () {
    function MusicController() {
    }
    MusicController.prototype.postMusic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var musicBusiness, token, _a, title, file, genres, album, postData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        musicBusiness = new CreateMusicBusiness_1.CreateMusicBusiness(new MusicDatabase_1.MusicDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
                        token = req.headers.authorization;
                        _a = req.body, title = _a.title, file = _a.file, genres = _a.genres, album = _a.album;
                        postData = {
                            title: title,
                            file: file,
                            genres: genres,
                            album: album
                        };
                        return [4 /*yield*/, musicBusiness.execute(postData, token)];
                    case 1:
                        _b.sent();
                        res.sendStatus(201);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        res.status(error_1.errorCode || 400).send({ error: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [4 /*yield*/, BaseDatabase_1.BaseDatabase.destroyConnection()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MusicController;
}());
exports.MusicController = MusicController;
