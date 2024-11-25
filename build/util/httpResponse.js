"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constent/application");
const loger_1 = __importDefault(require("../util/loger"));
exports.default = (req, res, responseStatusCode, responseMessage, data = null) => {
    const response = {
        success: true,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    };
    loger_1.default.info('CONTROLLER_RESPONSE', {
        meta: response
    });
    if (config_1.default.ENV === application_1.EApplicationEnvionment.PRODUCTION) {
        delete response.request.ip;
    }
    res.status(responseStatusCode).json(response);
};
