"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.knex = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var logger_1 = require("./src/utils/logger");
var cors_1 = __importDefault(require("cors"));
var knex_1 = __importDefault(require("knex"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var knexfile_1 = __importDefault(require("./knexfile"));
var configMode = process.env.NODE_ENV || "development";
var knexConfig = knexfile_1.default[configMode];
exports.knex = (0, knex_1.default)(knexConfig);
var app = (0, express_1.default)();
var server = new http_1.default.Server(app);
// export const io = new SocketIO(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//   },
// });
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({ origin: [(_a = process.env.FRONTEND_URL) !== null && _a !== void 0 ? _a : ""] }));
// app.use(cors({ origin: ["http://localhost:3000" ?? ""] }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, express_session_1.default)({
    secret: Math.random().toString(32).slice(2),
    resave: true,
    saveUninitialized: true,
}));
var grant_1 = __importDefault(require("grant"));
var grantExpress = grant_1.default.express({
    defaults: {
        origin: process.env.BACKEND_URL,
        // origin: "http://localhost:8080",
        transport: "session",
        state: true,
    },
    google: {
        key: process.env.GOOGLE_CLIENT_ID || "",
        secret: process.env.GOOGLE_CLIENT_SECRET || "",
        scope: ["profile", "email"],
        callback: "/user/login/google",
    },
});
exports.io.on("connection", function (socket) {
    socket.on("send-message", function (data) {
        socket.emit("new-message", "received your msg: ".concat(data));
    });
});
app.use(grantExpress);
var routes_1 = require("./src/routes");
app.use(routes_1.routes);
var PORT = 8080;
server.listen(PORT, function () {
    logger_1.logger.info("listening to port ".concat(PORT));
});
//# sourceMappingURL=main.js.map