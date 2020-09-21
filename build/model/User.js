"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, nickname, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getNickname() {
        return this.nickname;
    }
    getPassword() {
        return this.password;
    }
    setId(id) {
        this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setNickname(nickname) {
        this.nickname = nickname;
    }
    setPassword(password) {
        this.password = password;
    }
    static toUserModel(data) {
        return (data &&
            new User(data.id, data.name, data.email, data.nickname, data.password));
    }
}
exports.User = User;
