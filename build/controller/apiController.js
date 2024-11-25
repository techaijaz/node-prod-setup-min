"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpResponse_1 = __importDefault(require("../util/httpResponse"));
const responceseMessage_1 = __importDefault(require("../constent/responceseMessage"));
const httpError_1 = __importDefault(require("../util/httpError"));
const quiker_1 = __importDefault(require("../util/quiker"));
exports.default = {
    self: (req, res, next) => {
        try {
            (0, httpResponse_1.default)(req, res, 200, responceseMessage_1.default.SUCCESS, null);
        }
        catch (error) {
            (0, httpError_1.default)(next, error, req, 500);
        }
    },
    health: (req, res, next) => {
        try {
            const healthData = {
                application: quiker_1.default.getApplicationHealth(),
                system: quiker_1.default.getSystemHealth(),
                timeStamp: Date.now()
            };
            (0, httpResponse_1.default)(req, res, 200, responceseMessage_1.default.SUCCESS, healthData);
        }
        catch (error) {
            (0, httpError_1.default)(next, error, req, 500);
        }
    }
};
