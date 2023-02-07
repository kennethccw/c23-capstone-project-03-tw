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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var tables_1 = require("../utils/tables");
var UserService = /** @class */ (function () {
    function UserService(knex) {
        var _this = this;
        this.knex = knex;
        this.register = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var isOrganisationEmail, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                                .select()
                                .where("email", user.email)
                                .first()];
                    case 1:
                        isOrganisationEmail = _a.sent();
                        if (isOrganisationEmail) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .insert(user)
                                .returning(["id", "username"])
                                .returning("*")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loginWithEmail = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var userResult, organisationResult, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("loginWithEmail");
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("id", "username", "password")
                                .where("email", email)
                                .first()];
                    case 1:
                        userResult = _a.sent();
                        console.log(userResult);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                                .select("id", "name as username", "password")
                                .where("email", email)
                                .first()];
                    case 2:
                        organisationResult = _a.sent();
                        console.log(organisationResult);
                        return [2 /*return*/, { userResult: userResult, organisationResult: organisationResult }];
                    case 3:
                        e_2 = _a.sent();
                        console.log("there is error");
                        console.log(e_2);
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loginWithUsername = function (username) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("id", "username", "password")
                                .where("username", username)
                                .first()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.verifyUser = function (id, role) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = void 0;
                        if (!(role === "user")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("id", "username", "email")
                                .where("id", id)
                                .first()];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                            .select("id", "name as username", "email")
                            .where("id", id)
                            .first()];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, result];
                    case 5:
                        e_4 = _a.sent();
                        console.log(e_4);
                        throw e_4;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getProfile = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS).select().where("id", uid).first()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.editProfile = function (uid, user) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .update(user)
                                .update("updated_at", this.knex.fn.now())
                                .where("id", uid)
                                .returning("*")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0]];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        throw e_6;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.changePassword = function (uid, password) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("here is database");
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .update({ password: password })
                                .update("updated_at", this.knex.fn.now())
                                .where("id", uid)
                                .returning("*")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_7 = _a.sent();
                        console.log(e_7);
                        throw e_7;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map