"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const BaseError_1 = require("./BaseError/BaseError");
class ForbiddenError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
