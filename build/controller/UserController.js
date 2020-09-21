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
exports.UserController = void 0;
const BaseDatabase_1 = require("../data/BaseDatabase");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const HashManager_1 = require("../services/HashManager");
const Authenticator_1 = require("../services/Authenticator");
const SignupBusiness_1 = require("../business/SignupBusiness");
const LoginBusiness_1 = require("../business/LoginBusiness");
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const singnupBusiness = new SignupBusiness_1.SignupBusiness(new UserDatabase_1.UserDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
                const signupData = {
                    name: req.body.name,
                    email: req.body.email,
                    nickname: req.body.nickname,
                    password: req.body.password
                };
                const token = yield singnupBusiness.execute(signupData);
                res.status(201).send({ token });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginBusiness = new LoginBusiness_1.LoginBusiness(new UserDatabase_1.UserDatabase(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator());
                const loginData = {
                    emailOrNickname: req.body.emailOrNickname,
                    password: req.body.password
                };
                const token = yield loginBusiness.execute(loginData);
                res.status(200).send({ token });
            }
            catch (error) {
                res.status(error.errorCode || 400).send({ error: error.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.UserController = UserController;
