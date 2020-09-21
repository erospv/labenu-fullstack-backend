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
exports.LoginBusiness = void 0;
const UnauthorizedError_1 = require("../error/UnauthorizedError");
const InvalidParameterError_1 = require("../error/InvalidParameterError");
class LoginBusiness {
    constructor(userDatabase, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.emailOrNickname || !input.password) {
                throw new InvalidParameterError_1.InvalidParameterError("Fill all the fields");
            }
            const user = yield this.userDatabase.getUserByEmailOrNickname(input.emailOrNickname);
            if (!user) {
                throw new UnauthorizedError_1.UnauthorizedError("Incorrect email or password");
            }
            const hashCompare = yield this.hashManager.compareHash(input.password, user.getPassword());
            if (!hashCompare) {
                throw new UnauthorizedError_1.UnauthorizedError("Incorrect email or password");
            }
            const accessToken = this.authenticator.generateToken({
                id: user.getId(),
            });
            return accessToken;
        });
    }
}
exports.LoginBusiness = LoginBusiness;
