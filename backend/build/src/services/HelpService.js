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
exports.HelpService = void 0;
var tables_1 = require("../utils/tables");
var HelpService = /** @class */ (function () {
    function HelpService(knex) {
        var _this = this;
        this.knex = knex;
        this.getOrganisationChatroom = function (uid, organisation_id) { return __awaiter(_this, void 0, void 0, function () {
            var organisationResult, messageResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                                .select()
                                .where("id", organisation_id)
                                .first()];
                    case 1:
                        organisationResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .select()
                                .where("user_id", uid)
                                .andWhere("organisation_id", organisation_id)];
                    case 2:
                        messageResult = _a.sent();
                        // .orderBy("id", "desc")
                        // .limit(10);
                        // console.log(messageResult);
                        return [2 /*return*/, { organisation: organisationResult, message: messageResult }];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getSupportPanel = function (organisation_id) { return __awaiter(_this, void 0, void 0, function () {
            var messageResult, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .select()
                                .where("organisation_id", organisation_id)
                                .andWhere("status", "pending")
                                .innerJoin(tables_1.TABLES.USERS, "".concat(tables_1.TABLES.USERS, ".id"), "".concat(tables_1.TABLES.PET_SUPPORTS, ".user_id"))];
                    case 1:
                        messageResult = _a.sent();
                        // .orderBy("id", "desc")
                        // .limit(10);
                        // console.log(messageResult);
                        return [2 /*return*/, messageResult];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUserChatroom = function (organisation_id, uid) { return __awaiter(_this, void 0, void 0, function () {
            var userResult, messageResult, username, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        console.log("get user chatroom");
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("username")
                                .where("id", uid)
                                .first()];
                    case 1:
                        userResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .select()
                                .where("user_id", uid)
                                .andWhere("organisation_id", organisation_id)];
                    case 2:
                        messageResult = _a.sent();
                        username = userResult.username;
                        return [2 /*return*/, { user: username, message: messageResult }];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postClientTextChatroom = function (user_id, organisation_id, conversation) { return __awaiter(_this, void 0, void 0, function () {
            var messageResult, user, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .insert({
                                user_id: user_id,
                                organisation_id: organisation_id,
                                conversation: conversation,
                                role: "user",
                            })
                                .returning("*")];
                    case 1:
                        messageResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("username")
                                .where("id", messageResult[0].user_id)
                                .first()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, { message: messageResult[0], user: user }];
                    case 3:
                        e_4 = _a.sent();
                        console.log(e_4);
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postClientImageChatroom = function (user_id, organisation_id, image) { return __awaiter(_this, void 0, void 0, function () {
            var messageResult, user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .insert({
                                user_id: user_id,
                                organisation_id: organisation_id,
                                image: image,
                                role: "user",
                            })
                                .returning("*")];
                    case 1:
                        messageResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("username")
                                .where("id", messageResult[0].user_id)
                                .first()];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, { message: messageResult[0], user: user }];
                    case 3:
                        e_5 = _a.sent();
                        console.log(e_5);
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postSupportTextChatroom = function (user_id, organisation_id, conversation) { return __awaiter(_this, void 0, void 0, function () {
            var messageResult, organisation, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .insert({
                                user_id: user_id,
                                organisation_id: organisation_id,
                                conversation: conversation,
                                role: "organisation",
                            })
                                .returning("*")];
                    case 1:
                        messageResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                                .select("name")
                                .where("id", messageResult[0].organisation_id)
                                .first()];
                    case 2:
                        organisation = _a.sent();
                        return [2 /*return*/, { message: messageResult[0], organisation: organisation }];
                    case 3:
                        e_6 = _a.sent();
                        console.log(e_6);
                        throw e_6;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postSupportImageChatroom = function (user_id, organisation_id, image) { return __awaiter(_this, void 0, void 0, function () {
            var messageResult, organisation, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PET_SUPPORTS)
                                .insert({
                                user_id: user_id,
                                organisation_id: organisation_id,
                                image: image,
                                role: "organisation",
                            })
                                .returning("*")];
                    case 1:
                        messageResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ORGANISATIONS)
                                .select("name")
                                .where("id", messageResult[0].organisation_id)
                                .first()];
                    case 2:
                        organisation = _a.sent();
                        return [2 /*return*/, { message: messageResult[0], organisation: organisation }];
                    case 3:
                        e_7 = _a.sent();
                        console.log(e_7);
                        throw e_7;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.notification = function (uid, name, organisationId) { return __awaiter(_this, void 0, void 0, function () {
            var isAppeared, result_1, result, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.NOTIFICATION)
                                .where("type", "message")
                                .andWhere("user_id", uid)
                                .andWhere("any_id", organisationId)
                                .first()];
                    case 1:
                        isAppeared = _a.sent();
                        if (!isAppeared) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.knex(tables_1.TABLES.NOTIFICATION)
                                .update("updated_at", new Date())
                                .increment("count", 1)
                                .where("type", "message")
                                .andWhere("user_id", uid)
                                .andWhere("any_id", organisationId)
                                .returning("*")];
                    case 2:
                        result_1 = _a.sent();
                        return [2 /*return*/, result_1[0]];
                    case 3: return [4 /*yield*/, this.knex(tables_1.TABLES.NOTIFICATION)
                            .insert({ type: "message", user_id: uid, content: name, count: 1, any_id: organisationId })
                            .returning("*")];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, result[0]];
                    case 5:
                        e_8 = _a.sent();
                        console.log(e_8);
                        throw e_8;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
    }
    return HelpService;
}());
exports.HelpService = HelpService;
//# sourceMappingURL=HelpService.js.map