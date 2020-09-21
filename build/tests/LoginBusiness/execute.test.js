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
var LoginBusiness_1 = require("../../src/business/LoginBusiness");
var User_1 = require("../../src/model/User");
describe("Testing the LoginBusiness 'execute' method", function () {
    var userDatabase = {};
    var hashManager = {};
    var authenticator = {
        generateToken: jest.fn(function () { return "token"; })
    };
    test("Should resturn an error when try login without email or nickname", function () { return __awaiter(void 0, void 0, void 0, function () {
        var loginBusiness, loginInput, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    loginBusiness = new LoginBusiness_1.LoginBusiness(userDatabase, hashManager, authenticator);
                    loginInput = {
                        emailOrNickname: "",
                        password: "123456"
                    };
                    return [4 /*yield*/, loginBusiness.execute(loginInput)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    expect(error_1.errorCode).toBe(422);
                    expect(error_1.message).toEqual("Fill all the fields");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    test("Should resturn an error when try login without password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var loginBusiness, loginInput, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    loginBusiness = new LoginBusiness_1.LoginBusiness(userDatabase, hashManager, authenticator);
                    loginInput = {
                        emailOrNickname: "eros@gmail.com",
                        password: ""
                    };
                    return [4 /*yield*/, loginBusiness.execute(loginInput)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    expect(error_2.errorCode).toBe(422);
                    expect(error_2.message).toEqual("Fill all the fields");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    test("Should return an error when try login with wrong password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUserByEmailOrNickname, compareHash, loginBusiness, loginInput, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(4);
                    getUserByEmailOrNickname = jest.fn(function (emailOrNickname) {
                        return new User_1.User("id", "Manu Chao", "clandestino@gmail.com", "ManoNegra", "mala-vida");
                    });
                    compareHash = jest.fn((function (password, userPassword) { return false; }));
                    userDatabase = { getUserByEmailOrNickname: getUserByEmailOrNickname };
                    hashManager = { compareHash: compareHash };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    loginBusiness = new LoginBusiness_1.LoginBusiness(userDatabase, hashManager, authenticator);
                    loginInput = {
                        emailOrNickname: "clandestino@gmail.com",
                        password: "12"
                    };
                    return [4 /*yield*/, loginBusiness.execute(loginInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    expect(error_3.errorCode).toBe(401);
                    expect(error_3.message).toEqual("Incorrect email or password");
                    expect(getUserByEmailOrNickname).toHaveBeenCalledWith("clandestino@gmail.com");
                    expect(compareHash).toHaveBeenCalledWith("12", "mala-vida");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Should return an error when try login with unregistered email", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUserByEmailOrNickname, loginBusiness, loginInput, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(3);
                    getUserByEmailOrNickname = jest.fn(function (emailOrNickname) { return undefined; });
                    userDatabase = { getUserByEmailOrNickname: getUserByEmailOrNickname };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    loginBusiness = new LoginBusiness_1.LoginBusiness(userDatabase, hashManager, authenticator);
                    loginInput = {
                        emailOrNickname: "mano-negra@gmail.com",
                        password: "123456"
                    };
                    return [4 /*yield*/, loginBusiness.execute(loginInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    expect(error_4.errorCode).toBe(401);
                    expect(error_4.message).toEqual("Incorrect email or password");
                    expect(getUserByEmailOrNickname).toHaveBeenCalledWith("mano-negra@gmail.com");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Returns token whit a successful login attempt", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUserByEmailOrNickname, compareHash, loginBusiness, loginInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getUserByEmailOrNickname = jest.fn(function (emailOrNickname) {
                        return new User_1.User("id", "Manu Chao", "clandestino@gmail.com", "ManoNegra", "mala-vida");
                    });
                    compareHash = jest.fn((function (password, userPassword) { return true; }));
                    userDatabase = { getUserByEmailOrNickname: getUserByEmailOrNickname };
                    hashManager = { compareHash: compareHash };
                    loginBusiness = new LoginBusiness_1.LoginBusiness(userDatabase, hashManager, authenticator);
                    loginInput = {
                        emailOrNickname: "clandestino@gmail.com",
                        password: "mala-vida"
                    };
                    return [4 /*yield*/, loginBusiness.execute(loginInput)];
                case 1:
                    _a.sent();
                    expect(getUserByEmailOrNickname).toHaveBeenCalledWith("clandestino@gmail.com");
                    expect(compareHash).toHaveBeenCalledWith("mala-vida", "mala-vida");
                    expect(authenticator.generateToken).toHaveReturnedWith("token");
                    return [2 /*return*/];
            }
        });
    }); });
});
