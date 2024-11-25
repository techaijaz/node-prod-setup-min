"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../constent/application");
const config_1 = __importDefault(require("../config/config"));
exports.default = (_req, _, next) => {
    if (config_1.default.ENV === application_1.EApplicationEnvionment.DEVELOPMENT) {
        return next();
    }
};
