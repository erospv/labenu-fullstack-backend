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
exports.SignupBusiness = void 0;
const InvalidParameterError_1 = require("../error/InvalidParameterError");
const User_1 = require("../model/User");
class SignupBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input.name || !input.email || !input.password || !input.nickname) {
                throw new InvalidParameterError_1.InvalidParameterError("Fill all the fields");
            }
            if (input.email.indexOf("@") === -1) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid email");
            }
            if (input.password.length < 6) {
                throw new InvalidParameterError_1.InvalidParameterError("Invalid password");
            }
            const id = this.idGenerator.generate();
            const hashPassword = yield this.hashManager.hash(input.password);
            const user = User_1.User.toUserModel(Object.assign(Object.assign({}, input), { id: id, password: hashPassword }));
            yield this.userDatabase.createUser(user);
            const accessToken = this.authenticator.generateToken({
                id,
            });
            return accessToken;
        });
    }
}
exports.SignupBusiness = SignupBusiness;
