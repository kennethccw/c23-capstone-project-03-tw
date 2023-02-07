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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
// import formidable from "formidable";
var models_1 = require("../utils/models");
var jwt_1 = __importDefault(require("../utils/jwt"));
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var jwt_simple_1 = __importDefault(require("jwt-simple"));
var hash_1 = require("../utils/hash");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        var _this = this;
        this.userService = userService;
        this.register = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var form, username, email, plainPassword, password, user, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = req.body;
                        username = form.username, email = form.email, plainPassword = form.password;
                        return [4 /*yield*/, (0, hash_1.hashPassword)(plainPassword)];
                    case 1:
                        password = _a.sent();
                        user = {
                            username: username,
                            email: email,
                            password: password,
                            // mobile,
                            // birthday,
                            // gender,
                            // is_experienced,
                            // photo,
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.userService.register(user)];
                    case 3:
                        result = _a.sent();
                        console.log(result);
                        if (result) {
                            res.status(200).json(result);
                        }
                        else {
                            res.status(400).json({ message: "此帳戶電郵地址已被動物機構採用" });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        res.status(400).json({ message: "帳戶名稱或電郵地址已被採用" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.loginWithUsernameOrEmail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userIdentity, password, user, payload, token, e_2, user, payload, token, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userIdentity = _a.userIdentity, password = _a.password;
                        if (!userIdentity.includes("@")) return [3 /*break*/, 10];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.userService.loginWithEmail(userIdentity)];
                    case 2:
                        user = _b.sent();
                        payload = {
                            id: 0,
                            username: "",
                            role: "",
                        };
                        if (!user) return [3 /*break*/, 7];
                        if (!user.userResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, hash_1.checkPassword)(password, user.userResult.password)];
                    case 3:
                        if (_b.sent()) {
                            payload.id = user.userResult.id;
                            payload.username = user.userResult.username;
                            payload.role = models_1.LoginRole.user;
                        }
                        else {
                            res.status(401).json({ message: "Unauthorised" });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        if (!user.organisationResult) return [3 /*break*/, 6];
                        console.log(user.organisationResult);
                        return [4 /*yield*/, (0, hash_1.checkPassword)(password, user.organisationResult.password)];
                    case 5:
                        if (_b.sent()) {
                            console.log("sir this way");
                            payload.id = user.organisationResult.id;
                            payload.username = user.organisationResult.username;
                            payload.role = models_1.LoginRole.organisation;
                        }
                        else {
                            res.status(401).json({ message: "Unauthorised" });
                            return [2 /*return*/];
                        }
                        _b.label = 6;
                    case 6:
                        token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                        // req.session.user = { id: user.id, username: user.username };
                        res.status(200).json({ token: token });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_2 = _b.sent();
                        console.log(e_2);
                        res.status(400).json({ message: "User not found" });
                        return [3 /*break*/, 9];
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        _b.trys.push([10, 13, , 14]);
                        return [4 /*yield*/, this.userService.loginWithUsername(userIdentity)];
                    case 11:
                        user = _b.sent();
                        return [4 /*yield*/, (0, hash_1.checkPassword)(password, user.password)];
                    case 12:
                        if (_b.sent()) {
                            payload = {
                                id: user.id,
                                username: user.username,
                                role: models_1.LoginRole.user,
                            };
                            token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                            // req.session.user = { id: user.id, username: user.username };
                            res.status(200).json({ token: token });
                        }
                        else {
                            res.status(401).json({ message: "Unauthorised" });
                        }
                        return [3 /*break*/, 14];
                    case 13:
                        e_3 = _b.sent();
                        res.status(400).json({ message: "User not found" });
                        return [3 /*break*/, 14];
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        this.loginWithGoogle = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var accessToken, fetchRes, data, user, payload, token, e_4;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = (_a = req.session) === null || _a === void 0 ? void 0 : _a["grant"].response.access_token;
                        return [4 /*yield*/, (0, cross_fetch_1.default)("https://www.googleapis.com/oauth2/v2/userinfo", {
                                method: "get",
                                headers: { Authorization: "Bearer ".concat(accessToken) },
                            })];
                    case 1:
                        fetchRes = _b.sent();
                        return [4 /*yield*/, fetchRes.json()];
                    case 2:
                        data = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.userService.loginWithEmail(data.email)];
                    case 4:
                        user = _b.sent();
                        if (!user) {
                            res.status(400).json({ email: data.email, message: "User not found" });
                            return [2 /*return*/];
                        }
                        payload = {
                            id: 0,
                            username: "",
                            role: "",
                        };
                        if (user.organisationResult) {
                            payload.id = user.organisationResult.id;
                            payload.username = user.organisationResult.username;
                            payload.role = models_1.LoginRole.organisation;
                        }
                        if (user.userResult) {
                            payload.id = user.userResult.id;
                            payload.username = user.userResult.username;
                            payload.role = models_1.LoginRole.user;
                        }
                        token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                        res.redirect("".concat(process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "http://localhost:3000", "/google-callback?token=").concat(token));
                        return [3 /*break*/, 6];
                    case 5:
                        e_4 = _b.sent();
                        res.status(400).json({ email: data.email, message: "User not found" });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.loginWithFacebook = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var code, fetchResponse, data, profileResponse, profileData, user, payload, token, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("facebook login");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        if (!req.body.code) {
                            console.log("dont have code ");
                            res.status(401).json({ msg: "Wrong Code!" });
                            return [2 /*return*/];
                        }
                        console.log("have code");
                        code = req.body.code;
                        return [4 /*yield*/, (0, cross_fetch_1.default)("https://graph.facebook.com/oauth/access_token", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                                body: new URLSearchParams({
                                    grant_type: "authorization_code",
                                    client_id: process.env.FACEBOOK_CLIENT_ID + "",
                                    client_secret: process.env.FACEBOOK_CLIENT_SECRET + "",
                                    code: code + "",
                                    redirect_uri: "".concat(process.env.FRONTEND_URL, "/facebook-callback"),
                                }),
                            })];
                    case 2:
                        fetchResponse = _a.sent();
                        return [4 /*yield*/, fetchResponse.json()];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        if (!data.access_token) {
                            res.status(401).json({ msg: "Failed to get access token!" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, cross_fetch_1.default)("https://graph.facebook.com/me?fields=id,name,email,picture&access_token=".concat(data.access_token))];
                    case 4:
                        profileResponse = _a.sent();
                        return [4 /*yield*/, profileResponse.json()];
                    case 5:
                        profileData = _a.sent();
                        return [4 /*yield*/, this.userService.loginWithEmail(profileData.email)];
                    case 6:
                        user = _a.sent();
                        console.log("hihi");
                        console.log(user);
                        // Create a new user if the user does not exist
                        if (!user) {
                            res.status(400).json({ email: profileData.email, message: "User not found" });
                            return [2 /*return*/];
                        }
                        payload = {
                            id: 0,
                            username: "",
                            role: "",
                        };
                        if (user.organisationResult) {
                            payload.id = user.organisationResult.id;
                            payload.username = user.organisationResult.username;
                            payload.role = models_1.LoginRole.organisation;
                        }
                        if (user.userResult) {
                            payload.id = user.userResult.id;
                            payload.username = user.userResult.username;
                            payload.role = models_1.LoginRole.user;
                        }
                        token = jwt_simple_1.default.encode(payload, jwt_1.default.jwtSecret);
                        res.json({
                            token: token,
                        });
                        return [3 /*break*/, 8];
                    case 7:
                        e_5 = _a.sent();
                        res.status(500).json({ msg: e_5.toString() });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid, result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = req.user.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.getProfile(uid)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        res.status(400).json({ message: "Internal server error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.editProfile = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid, user, result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = req.user.id;
                        user = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.editProfile(uid, user)];
                    case 2:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        e_7 = _a.sent();
                        res.status(400).json({ message: "Internal server error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid, plainPassword, password, result, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = req.user.id;
                        plainPassword = req.body.password;
                        console.log(plainPassword);
                        return [4 /*yield*/, (0, hash_1.hashPassword)(plainPassword)];
                    case 1:
                        password = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.userService.changePassword(uid, password)];
                    case 3:
                        result = _a.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 5];
                    case 4:
                        e_8 = _a.sent();
                        res.status(400).json({ message: "Internal server error" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.logout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                req.user = undefined;
                res.status(200).json({ message: "Successful logout" });
                return [2 /*return*/];
            });
        }); };
        this.validation = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                console.log("validated");
                token = req.body.token;
                res.status(200).json({ token: token });
                return [2 /*return*/];
            });
        }); };
    }
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map