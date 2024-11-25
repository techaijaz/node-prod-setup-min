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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const loger_1 = __importDefault(require("./util/loger"));
const app_1 = __importDefault(require("./app"));
const server = app_1.default.listen(config_1.default.PORT, () => { });
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        loger_1.default.info('APPLICATION STARTED', {
            meta: {
                PORT: config_1.default.PORT,
                SERVVER_URL: config_1.default.SERVER_URL
            }
        });
    }
    catch (error) {
        loger_1.default.error('APPLICATION STARTED', { meta: error });
        server.close(() => {
            if (error) {
                loger_1.default.error('APPLICATION STARTED', { meta: error });
            }
            process.exit(1);
        });
    }
}))();
