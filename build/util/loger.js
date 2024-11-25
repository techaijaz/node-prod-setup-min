"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const util_1 = __importDefault(require("util"));
const config_1 = __importDefault(require("../config/config"));
const application_1 = require("../constent/application");
const path_1 = __importDefault(require("path"));
const sourceMapSupport = __importStar(require("source-map-support"));
const colorette_1 = require("colorette");
sourceMapSupport.install();
const coloriseLevel = (level) => {
    switch (level) {
        case 'ERROR':
            return (0, colorette_1.red)(level);
        case 'INFO':
            return (0, colorette_1.blue)(level);
        case 'WARN':
            return (0, colorette_1.yellow)(level);
        default:
            return level;
    }
};
const consoleFormate = winston_1.format.printf((info) => {
    const { level, message, timestamp, meta } = info;
    const customLevel = coloriseLevel(level.toUpperCase());
    const customTimestamp = (0, colorette_1.green)(timestamp);
    const customMeta = util_1.default.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    });
    const customLog = `${customLevel} [${customTimestamp}] ${message} \n ${(0, colorette_1.magenta)('META')} ${customMeta}\n`;
    return customLog;
});
const consoleTransport = () => {
    if (config_1.default.ENV === application_1.EApplicationEnvionment.PRODUCTION) {
        return [
            new winston_1.transports.Console({
                level: 'info',
                format: winston_1.format.combine(winston_1.format.timestamp(), consoleFormate)
            })
        ];
    }
    return [];
};
const fileFormate = winston_1.format.printf((info) => {
    const { level, message, timestamp, meta } = info;
    const logMeta = {};
    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack || null
            };
        }
        else {
            logMeta[key] = value;
        }
    }
    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    };
    return JSON.stringify(logData, null, 4);
});
const fileTransport = () => {
    return [
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, '../', '../', 'logs', `${config_1.default.ENV}.log`),
            level: 'info',
            format: winston_1.format.combine(winston_1.format.timestamp(), fileFormate)
        })
    ];
};
exports.default = (0, winston_1.createLogger)({
    defaultMeta: {
        meta: {}
    },
    transports: [
        ...fileTransport(),
        ...consoleTransport()
    ]
});
