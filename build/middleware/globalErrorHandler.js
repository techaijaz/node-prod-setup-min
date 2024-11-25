"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = void 0;
const responceseMessage_1 = __importDefault(require("../constent/responceseMessage"));
const httpError_1 = __importDefault(require("../util/httpError"));
const notFoundError = (req, _, next) => {
    try {
        throw new Error(responceseMessage_1.default.NOT_FOUND('Route'));
    }
    catch (error) {
        (0, httpError_1.default)(next, error, req, 500);
    }
};
exports.notFoundError = notFoundError;
exports.default = (error, _, res, __) => {
    res.status(error.statusCode).json(error);
};
