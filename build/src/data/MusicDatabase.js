"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MusicDatabase = void 0;
var BaseDatabase_1 = require("./BaseDatabase");
var MusicDatabase = /** @class */ (function (_super) {
    __extends(MusicDatabase, _super);
    function MusicDatabase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicDatabase.prototype.createMusic = function (music) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getConnection()
                                .insert({
                                id: music.getId(),
                                title: music.getTitle(),
                                author_id: music.getAuthorId(),
                                file: music.getFile(),
                                album: music.getAlbum()
                            })
                                .into(MusicDatabase.MUSIC_TABLE)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error(error_1.sqlMessage || error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MusicDatabase.prototype.getGenresIdsByNames = function (genres) {
        return __awaiter(this, void 0, void 0, function () {
            var genresIds, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getConnection()
                                .select("id")
                                .from(MusicDatabase.GENRE_TABLE)
                                .whereIn("genre", genres)];
                    case 1:
                        genresIds = _a.sent();
                        return [2 /*return*/, genresIds];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error(error_2.sqlMessage || error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MusicDatabase.prototype.insertGenresToMusic = function (genresIds, musicId) {
        return __awaiter(this, void 0, void 0, function () {
            var musicGenres, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        musicGenres = genresIds.map(function (item) {
                            return {
                                genre_id: item.id,
                                music_id: musicId
                            };
                        });
                        return [4 /*yield*/, this.getConnection()
                                .insert(musicGenres)
                                .into(MusicDatabase.MUSIC_GENRE_TABLE)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error(error_3.sqlMessage || error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MusicDatabase.MUSIC_TABLE = "music";
    MusicDatabase.GENRE_TABLE = "genre";
    MusicDatabase.MUSIC_GENRE_TABLE = "music_genre";
    return MusicDatabase;
}(BaseDatabase_1.BaseDatabase));
exports.MusicDatabase = MusicDatabase;
