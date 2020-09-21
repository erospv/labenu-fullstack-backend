"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicRouter = void 0;
var express_1 = __importDefault(require("express"));
var MusicController_1 = require("../controller/MusicController");
exports.musicRouter = express_1.default.Router();
var musicController = new MusicController_1.MusicController();
exports.musicRouter.post("/create", musicController.postMusic);
