"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var userRouter_1 = require("./routes/userRouter");
var musicRouter_1 = require("./routes/musicRouter");
dotenv_1.default.config();
var app = express_1.default();
app.use(express_1.default.json());
app.use("/user", userRouter_1.userRouter);
app.use("/music", musicRouter_1.musicRouter);
var server = app.listen(Number(process.env.PORT) || 3003, function () {
    if (server) {
        var address = server.address();
        console.log("Server running on https://labesound.azurewebsites.net:" + address.port);
    }
    else {
        console.error("Server start failed");
    }
});
