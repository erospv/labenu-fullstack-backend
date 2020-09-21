"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, title, authorId, file, album) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.file = file;
        this.album = album;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getAuthorId() {
        return this.authorId;
    }
    getFile() {
        return this.file;
    }
    getAlbum() {
        return this.album;
    }
    setId(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setAuthorId(authorId) {
        this.authorId = authorId;
    }
    setFile(file) {
        this.file = file;
    }
    setAlbumId(album) {
        this.album = album;
    }
    static toMusicModel(data) {
        return (data &&
            new Music(data.id, data.title, data.authorId, data.file, data.album));
    }
}
exports.Music = Music;
