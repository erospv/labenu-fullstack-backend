"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
var Music = /** @class */ (function () {
    function Music(id, title, authorId, file, album) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.file = file;
        this.album = album;
    }
    Music.prototype.getId = function () {
        return this.id;
    };
    Music.prototype.getTitle = function () {
        return this.title;
    };
    Music.prototype.getAuthorId = function () {
        return this.authorId;
    };
    Music.prototype.getFile = function () {
        return this.file;
    };
    Music.prototype.getAlbum = function () {
        return this.album;
    };
    Music.prototype.setId = function (id) {
        this.id = id;
    };
    Music.prototype.setTitle = function (title) {
        this.title = title;
    };
    Music.prototype.setAuthorId = function (authorId) {
        this.authorId = authorId;
    };
    Music.prototype.setFile = function (file) {
        this.file = file;
    };
    Music.prototype.setAlbumId = function (album) {
        this.album = album;
    };
    Music.toMusicModel = function (data) {
        return (data &&
            new Music(data.id, data.title, data.authorId, data.file, data.album));
    };
    return Music;
}());
exports.Music = Music;
