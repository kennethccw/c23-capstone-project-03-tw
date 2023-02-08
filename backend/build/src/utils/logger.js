"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var logFormat = winston_1.default.format.printf(function (info) {
    var date = new Date().toISOString();
    return "".concat(date, "[").concat(info.level, "]: ").concat(info.message, "\n");
});
exports.logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), logFormat),
    transports: [new winston_1.default.transports.Console()],
});
//# sourceMappingURL=logger.js.map