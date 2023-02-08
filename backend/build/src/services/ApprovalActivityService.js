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
exports.ApprovalActivityService = void 0;
var tables_1 = require("../utils/tables");
var ApprovalActivityService = /** @class */ (function () {
    function ApprovalActivityService(knex) {
        var _this = this;
        this.knex = knex;
        this.getPendingApplication = function (organisationId) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .select("*", "".concat(tables_1.TABLES.ACTIVITIES, ".id as activity_id"), "".concat(tables_1.TABLES.ACTIVITIES, ".image as image"), "".concat(tables_1.TABLES.ACTIVITIES, ".name as activity"), "".concat(tables_1.TABLES.USERS, ".fullname as user_fullname"))
                                .where("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_approved"), false)
                                .where("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_cancelled"), false)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_rejected"), false)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITIES, ".organisation_id"), organisationId)
                                .innerJoin(tables_1.TABLES.ACTIVITIES, "".concat(tables_1.TABLES.ACTIVITIES, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".activity_id"))
                                .innerJoin(tables_1.TABLES.USERS, "".concat(tables_1.TABLES.USERS, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".user_id"))];
                    case 1:
                        result = _a.sent();
                        // console.log(result, "ApprovalActivityService.ts L26");
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.putPendingApplication = function (organisationId, applicationArr) { return __awaiter(_this, void 0, void 0, function () {
            var trx, resultArr, _i, applicationArr_1, application, activityName, result, activityResult, notificationResult, result, notificationResult, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 14, , 15]);
                        resultArr = [];
                        _i = 0, applicationArr_1 = applicationArr;
                        _a.label = 3;
                    case 3:
                        if (!(_i < applicationArr_1.length)) return [3 /*break*/, 12];
                        application = applicationArr_1[_i];
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITIES)
                                .select("name")
                                .where("id", application.activity_id)];
                    case 4:
                        activityName = _a.sent();
                        if (!application.is_approved) return [3 /*break*/, 8];
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .update({ is_approved: true, updated_at: new Date() })
                                .where("user_id", application.user_id)
                                .andWhere("activity_id", application.activity_id)
                                .returning("*")];
                    case 5:
                        result = _a.sent();
                        resultArr.push(result[0]);
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITIES)
                                .decrement("remaining_place", 1)
                                .update("updated_at", new Date())
                                .where("id", application.activity_id)
                                .returning("*")];
                    case 6:
                        activityResult = _a.sent();
                        resultArr.push(activityResult[0]);
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION)
                                .insert({
                                type: "activity",
                                content: "".concat(activityName[0].name, "\u7684\u6D3B\u52D5\u7533\u8ACB\u5DF2\u7372\u63A5\u7D0D"),
                                any_id: application.activity_id,
                                user_id: application.user_id,
                            })
                                .returning("*")];
                    case 7:
                        notificationResult = _a.sent();
                        resultArr.push(notificationResult[0]);
                        return [3 /*break*/, 11];
                    case 8:
                        if (!application.is_rejected) return [3 /*break*/, 11];
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .update({ is_rejected: true, updated_at: new Date() })
                                .where("user_id", application.user_id)
                                .andWhere("activity_id", application.activity_id)
                                .returning("*")];
                    case 9:
                        result = _a.sent();
                        resultArr.push(result[0]);
                        return [4 /*yield*/, trx(tables_1.TABLES.NOTIFICATION)
                                .insert({
                                type: "activity",
                                content: "".concat(activityName[0].name, "\u7684\u6D3B\u52D5\u7533\u8ACB\u6C92\u6709\u88AB\u63A5\u7D0D"),
                                any_id: application.activity_id,
                                user_id: application.user_id,
                            })
                                .returning("*")];
                    case 10:
                        notificationResult = _a.sent();
                        resultArr.push(notificationResult[0]);
                        _a.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 3];
                    case 12: return [4 /*yield*/, trx.commit()];
                    case 13:
                        _a.sent();
                        return [2 /*return*/, resultArr];
                    case 14:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.getApprovedApplication = function (organisationId) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .select("*", "".concat(tables_1.TABLES.ACTIVITIES, ".id as activity_id"), "".concat(tables_1.TABLES.ACTIVITIES, ".image as image"), "".concat(tables_1.TABLES.ACTIVITIES, ".name as activity"), "".concat(tables_1.TABLES.USERS, ".fullname as user_fullname"))
                                .where("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_approved"), true)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITIES, ".organisation_id"), organisationId)
                                .innerJoin(tables_1.TABLES.ACTIVITIES, "".concat(tables_1.TABLES.ACTIVITIES, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".activity_id"))
                                .innerJoin(tables_1.TABLES.USERS, "".concat(tables_1.TABLES.USERS, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".user_id"))];
                    case 1:
                        result = _a.sent();
                        // console.log(result, "ApprovalActivityService.ts L53");
                        return [2 /*return*/, result];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ApprovalActivityService;
}());
exports.ApprovalActivityService = ApprovalActivityService;
//# sourceMappingURL=ApprovalActivityService.js.map