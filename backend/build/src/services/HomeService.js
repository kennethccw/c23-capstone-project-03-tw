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
exports.HomeService = void 0;
var models_1 = require("../utils/models");
var tables_1 = require("../utils/tables");
var HomeService = /** @class */ (function () {
    function HomeService(knex) {
        var _this = this;
        this.knex = knex;
        this.getHomeActivities = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITIES)
                                .select()
                                .where("activities.date", ">", new Date())
                                .orderBy("".concat(tables_1.TABLES.ACTIVITIES, ".date"), "asc")];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getHomeAdvertisers = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADVERTISERS).select()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postHomeAdvertiser = function (uid, adsId) { return __awaiter(_this, void 0, void 0, function () {
            var trx, badgeResult, isUserRecordExist, isAdvertiserRecordExist, userRecordResult, adsRecordResult, adsRecordResult, userRecordResult, badgeResult_1, adsRecordResult, adsRecordResult, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 28, , 30]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
                                .select()
                                .where("year", new Date().getFullYear())
                                .andWhere("".concat(tables_1.TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES, ".user_id"), uid)
                                .first()];
                    case 3:
                        isUserRecordExist = _a.sent();
                        console.log(isUserRecordExist);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR)
                                .select()
                                .where("year", new Date().getFullYear())
                                .andWhere("".concat(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR, ".advertiser_id"), adsId)
                                .first()];
                    case 4:
                        isAdvertiserRecordExist = _a.sent();
                        console.log(isAdvertiserRecordExist);
                        if (!isUserRecordExist) return [3 /*break*/, 18];
                        return [4 /*yield*/, trx(tables_1.TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
                                .update("updated_at", this.knex.fn.now())
                                .increment("total_advertising_watch_times", 1)
                                .where("year", new Date().getFullYear())
                                .andWhere("".concat(tables_1.TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES, ".user_id"), uid)
                                .returning("*")];
                    case 5:
                        userRecordResult = _a.sent();
                        if (!(userRecordResult[0]["total_advertising_watch_times"] > 20)) return [3 /*break*/, 8];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .update({
                                rank: models_1.BadgeRank.gold,
                                updated_at: new Date(),
                            })
                                .where("badge_id", models_1.BadgeType.advertising_philanthropist)
                                .andWhere("user_id", uid)
                                .andWhere("year", new Date().getFullYear())
                                .returning("*")];
                    case 6:
                        badgeResult = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛廣告慈善家徽章升級成金徽章了！",
                                user_id: uid,
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 8:
                        if (!(userRecordResult[0]["total_advertising_watch_times"] > 10)) return [3 /*break*/, 11];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .update({
                                rank: models_1.BadgeRank.silver,
                                updated_at: new Date(),
                            })
                                .where("badge_id", models_1.BadgeType.advertising_philanthropist)
                                .andWhere("year", new Date().getFullYear())
                                .andWhere("user_id", uid)
                                .returning("*")];
                    case 9:
                        badgeResult = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛廣告慈善家徽章升級成銀徽章了！",
                                user_id: uid,
                            })];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        console.log(badgeResult);
                        if (!isAdvertiserRecordExist) return [3 /*break*/, 14];
                        return [4 /*yield*/, trx(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR)
                                .update("updated_at", this.knex.fn.now())
                                .increment("total_watch_times", 1)
                                .where("year", new Date().getFullYear())
                                .andWhere("".concat(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR, ".advertiser_id"), adsId)
                                .returning("*")];
                    case 12:
                        adsRecordResult = _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 13:
                        _a.sent();
                        return [2 /*return*/, {
                                badgeReuslt: badgeResult && badgeResult[0],
                                userRecordResult: userRecordResult[0],
                                adsRecordResult: adsRecordResult[0],
                            }];
                    case 14: return [4 /*yield*/, trx(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR)
                            .insert({
                            year: new Date().getFullYear(),
                            total_watch_times: 1,
                            advertiser_id: adsId,
                        })
                            .returning("*")];
                    case 15:
                        adsRecordResult = _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 16:
                        _a.sent();
                        return [2 /*return*/, {
                                badgeReuslt: badgeResult && badgeResult[0],
                                userRecordResult: userRecordResult[0],
                                adsRecordResult: adsRecordResult[0],
                            }];
                    case 17: return [3 /*break*/, 27];
                    case 18: return [4 /*yield*/, trx(tables_1.TABLES.USER_TOTAL_ADVERTISING_WATCH_TIMES)
                            .insert({
                            year: new Date().getFullYear(),
                            total_advertising_watch_times: 1,
                            user_id: uid,
                        })
                            .returning("*")];
                    case 19:
                        userRecordResult = _a.sent();
                        console.log("sir this way");
                        console.log(userRecordResult);
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .insert({
                                rank: models_1.BadgeRank.copper,
                                year: new Date().getFullYear(),
                                badge_id: models_1.BadgeType.advertising_philanthropist,
                                user_id: uid,
                            })
                                .returning("*")];
                    case 20:
                        badgeResult_1 = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛獲得了廣告慈善家銅徽章！",
                                user_id: uid,
                            })];
                    case 21:
                        _a.sent();
                        console.log(badgeResult_1);
                        if (!isAdvertiserRecordExist) return [3 /*break*/, 24];
                        return [4 /*yield*/, trx(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR)
                                .update("updated_at", this.knex.fn.now())
                                .increment("total_watch_times", 1)
                                .where("year", new Date().getFullYear())
                                .andWhere("".concat(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR, ".advertiser_id"), adsId)
                                .returning("*")];
                    case 22:
                        adsRecordResult = _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 23:
                        _a.sent();
                        return [2 /*return*/, {
                                badgeReuslt: badgeResult_1[0],
                                userRecordResult: userRecordResult[0],
                                adsRecordResult: adsRecordResult[0],
                            }];
                    case 24: return [4 /*yield*/, trx(tables_1.TABLES.ADVERTISER_WATCHED_PER_YEAR)
                            .insert({
                            year: new Date().getFullYear(),
                            total_watch_times: 1,
                            advertiser_id: adsId,
                        })
                            .returning("*")];
                    case 25:
                        adsRecordResult = _a.sent();
                        console.log(adsRecordResult);
                        return [4 /*yield*/, trx.commit()];
                    case 26:
                        _a.sent();
                        return [2 /*return*/, {
                                badgeReuslt: badgeResult_1[0],
                                userRecordResult: userRecordResult[0],
                                adsRecordResult: adsRecordResult[0],
                            }];
                    case 27: return [3 /*break*/, 30];
                    case 28:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [4 /*yield*/, trx.rollback()];
                    case 29:
                        _a.sent();
                        throw e_3;
                    case 30: return [2 /*return*/];
                }
            });
        }); };
        this.getNotification = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.NOTIFICATION).select().where("user_id", uid)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteNotification = function (notificationId) { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.NOTIFICATION).delete().where("id", notificationId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return HomeService;
}());
exports.HomeService = HomeService;
//# sourceMappingURL=HomeService.js.map