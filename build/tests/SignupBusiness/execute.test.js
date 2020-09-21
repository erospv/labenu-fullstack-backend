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
var SignupBusiness_1 = require("../../src/business/SignupBusiness");
var User_1 = require("../../src/model/User");
describe("Testing the SignupBusiness 'execute' method", function () {
    var userDatabase = {
        createUser: jest.fn(function (user) { })
    };
    var idGenerator = {
        generate: jest.fn(function () { return "id"; })
    };
    var hashManager = {
        hash: jest.fn(function () { return "hash"; })
    };
    var authenticator = {
        generateToken: jest.fn(function () { return "token"; })
    };
    test("Should return an error when try create user with missing name ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signupBusiness, userInput, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    signupBusiness = new SignupBusiness_1.SignupBusiness(userDatabase, idGenerator, hashManager, authenticator);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userInput = {
                        name: "",
                        email: "donie@gmail.com",
                        nickname: "donie",
                        password: "00000000"
                    };
                    return [4 /*yield*/, signupBusiness.execute(userInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    expect(error_1.errorCode).toBe(422);
                    expect(error_1.message).toEqual("Fill all the fields");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Should return an error when try create user with missing email ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signupBusiness, userInput, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    signupBusiness = new SignupBusiness_1.SignupBusiness(userDatabase, idGenerator, hashManager, authenticator);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userInput = {
                        name: "Donatelo",
                        email: "",
                        nickname: "donie",
                        password: "000000"
                    };
                    return [4 /*yield*/, signupBusiness.execute(userInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    expect(error_2.errorCode).toBe(422);
                    expect(error_2.message).toEqual("Fill all the fields");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Should return an error when try create user with wrong email format ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signupBusiness, userInput, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    signupBusiness = new SignupBusiness_1.SignupBusiness(userDatabase, idGenerator, hashManager, authenticator);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userInput = {
                        name: "Donatelo",
                        email: "donie.com",
                        nickname: "donie",
                        password: "000000"
                    };
                    return [4 /*yield*/, signupBusiness.execute(userInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    expect(error_3.errorCode).toBe(422);
                    expect(error_3.message).toEqual("Invalid email");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Should return an error when try create user with wrong password format ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signupBusiness, userInput, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    signupBusiness = new SignupBusiness_1.SignupBusiness(userDatabase, idGenerator, hashManager, authenticator);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    userInput = {
                        name: "Donatelo",
                        email: "donie@gmail.com",
                        nickname: "donie",
                        password: "1235"
                    };
                    return [4 /*yield*/, signupBusiness.execute(userInput)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    expect(error_4.errorCode).toBe(422);
                    expect(error_4.message).toEqual("Invalid password");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test("Successful signup attempt", function () { return __awaiter(void 0, void 0, void 0, function () {
        var signupBusiness, userInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signupBusiness = new SignupBusiness_1.SignupBusiness(userDatabase, idGenerator, hashManager, authenticator);
                    userInput = {
                        name: "Donatelo",
                        email: "donie@gmail.com",
                        nickname: "donie",
                        password: "santa-tartaruga"
                    };
                    return [4 /*yield*/, signupBusiness.execute(userInput)];
                case 1:
                    _a.sent();
                    expect(hashManager.hash).toBeCalled();
                    expect(idGenerator.generate).toBeCalled();
                    expect(userDatabase.createUser).toBeCalledWith(new User_1.User("id", "Donatelo", "donie@gmail.com", "donie", "hash"));
                    expect(authenticator.generateToken).toHaveReturnedWith("token");
                    return [2 /*return*/];
            }
        });
    }); });
});
