"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responceseMessage_1 = __importDefault(require("../constent/responceseMessage"));
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constent/application");
const loger_1 = __importDefault(require("./loger"));
exports.default = (error, req, errorStatusCode = 500) => {
    const errorObj = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: error instanceof Error ? error.message || responceseMessage_1.default.ERROR : responceseMessage_1.default.ERROR,
        data: error,
        trace: error instanceof Error ? { error: error.stack } : null
    };
    loger_1.default.info('CONTROLLER_RESPONSE', {
        meta: errorObj
    });
    if (config_1.default.ENV === application_1.EApplicationEnvionment.PRODUCTION) {
        delete errorObj.request.ip;
        delete errorObj.trace;
    }
    return errorObj;
};
