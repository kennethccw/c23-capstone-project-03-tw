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
exports.DonationService = void 0;
var models_1 = require("../utils/models");
var tables_1 = require("../utils/tables");
var DonationService = /** @class */ (function () {
    function DonationService(knex) {
        var _this = this;
        this.knex = knex;
        this.putDonationSubmition = function (uid, donation) { return __awaiter(_this, void 0, void 0, function () {
            var trx, donation_amount, isDonatedThisYear, totalDonationThisYear, badgeThisYear, onetimeDonation, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 26, , 28]);
                        donation_amount = donation.donation_amount;
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USER_TOTAL_DONATIONS)
                                .select()
                                .where("user_id", uid)
                                .andWhere("year", new Date().getFullYear())
                                .first()];
                    case 3:
                        isDonatedThisYear = _a.sent();
                        totalDonationThisYear = void 0;
                        badgeThisYear = void 0;
                        if (!isDonatedThisYear) return [3 /*break*/, 13];
                        return [4 /*yield*/, trx(tables_1.TABLES.USER_TOTAL_DONATIONS)
                                .update({ updated_at: new Date() })
                                .increment("total_donation", donation_amount)
                                .where("user_id", uid)
                                .andWhere("year", new Date().getFullYear())
                                .returning("*")];
                    case 4:
                        totalDonationThisYear = _a.sent();
                        if (!(totalDonationThisYear[0].total_donation > 1000)) return [3 /*break*/, 7];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .update({
                                updated_at: new Date(),
                                rank: models_1.BadgeRank.gold,
                            })
                                .where("user_id", uid)
                                .andWhere("badge_id", models_1.BadgeType.donation_philanthropist)
                                .andWhere("year", new Date().getFullYear())
                                .returning("*")];
                    case 5:
                        badgeThisYear = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛捐款慈善家徽章升級成金徽章了！",
                                user_id: uid,
                            })];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 7:
                        if (!(totalDonationThisYear[0].total_donation > 500)) return [3 /*break*/, 10];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .update({
                                updated_at: new Date(),
                                rank: models_1.BadgeRank.silver,
                            })
                                .where("user_id", uid)
                                .andWhere("badge_id", models_1.BadgeType.donation_philanthropist)
                                .andWhere("year", new Date().getFullYear())
                                .returning("*")];
                    case 8:
                        badgeThisYear = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛捐款慈善家徽章升級成銀徽章了！",
                                user_id: uid,
                            })];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.knex(tables_1.TABLES.BADGE_USER_JUNCTION)
                            .select()
                            .where("user_id", uid)
                            .andWhere("year", new Date().getFullYear())];
                    case 11:
                        badgeThisYear = _a.sent();
                        _a.label = 12;
                    case 12: return [3 /*break*/, 23];
                    case 13: return [4 /*yield*/, trx(tables_1.TABLES.USER_TOTAL_DONATIONS)
                            .insert({ user_id: uid, total_donation: donation_amount, year: new Date().getFullYear() })
                            .returning("*")];
                    case 14:
                        totalDonationThisYear = _a.sent();
                        if (!(totalDonationThisYear[0].total_donation > 1000)) return [3 /*break*/, 17];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .insert({
                                user_id: uid,
                                badge_id: models_1.BadgeType.donation_philanthropist,
                                rank: models_1.BadgeRank.gold,
                                year: new Date().getFullYear(),
                            })
                                .returning("*")];
                    case 15:
                        badgeThisYear = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛捐款慈善家徽章升級成金徽章了！",
                                user_id: uid,
                            })];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 17:
                        if (!(totalDonationThisYear[0].total_donation > 500)) return [3 /*break*/, 20];
                        return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                                .insert({
                                user_id: uid,
                                badge_id: models_1.BadgeType.donation_philanthropist,
                                rank: models_1.BadgeRank.silver,
                                year: new Date().getFullYear(),
                            })
                                .returning("*")];
                    case 18:
                        badgeThisYear = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛捐款慈善家徽章升級成銀徽章了！",
                                user_id: uid,
                            })];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 20: return [4 /*yield*/, trx(tables_1.TABLES.BADGE_USER_JUNCTION)
                            .insert({
                            user_id: uid,
                            badge_id: models_1.BadgeType.donation_philanthropist,
                            rank: models_1.BadgeRank.copper,
                            year: new Date().getFullYear(),
                        })
                            .returning("*")];
                    case 21:
                        badgeThisYear = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION).insert({
                                type: models_1.NotificationType.badge,
                                content: "恭喜！剛剛獲得了捐款慈善家銅徽章！",
                                user_id: uid,
                            })];
                    case 22:
                        _a.sent();
                        _a.label = 23;
                    case 23: return [4 /*yield*/, trx(tables_1.TABLES.ONETIME_PAYMENT_DONATIONS)
                            .insert(donation)
                            .returning("*")];
                    case 24:
                        onetimeDonation = _a.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 25:
                        _a.sent();
                        return [2 /*return*/, {
                                badgeThisYear: badgeThisYear[0],
                                onetimeDonation: onetimeDonation[0],
                                totalDonationThisYear: totalDonationThisYear[0],
                            }];
                    case 26:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [4 /*yield*/, trx.rollback()];
                    case 27:
                        _a.sent();
                        throw e_1;
                    case 28: return [2 /*return*/];
                }
            });
        }); };
    }
    return DonationService;
}());
exports.DonationService = DonationService;
//# sourceMappingURL=DonationService.js.map