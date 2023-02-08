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
exports.ActivityService = void 0;
var tables_1 = require("../utils/tables");
var ActivityService = /** @class */ (function () {
    function ActivityService(knex) {
        var _this = this;
        this.knex = knex;
        this.getAllActivities = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITIES)
                                .select("*", "organisations.name as organisation", "activities.name as activity", "activities.id as activity_id")
                                .where("activities.date", ">", new Date())
                                .orderBy("".concat(tables_1.TABLES.ACTIVITIES, ".date"), "asc")
                                .andWhereNot("remaining_place", 0)
                                .innerJoin(tables_1.TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")];
                    case 1:
                        result = _a.sent();
                        // console.log(result, 'ActivityService.ts L18');
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getActivityDetail = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITIES)
                                .select("*", "organisations.name as organisation", "activities.name as activity", "activities.id as activity_id")
                                .innerJoin(tables_1.TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")
                                .first()
                                .where("activities.id", id)];
                    case 1:
                        result = _a.sent();
                        // console.log(result, "ActivityService.ts L37");
                        return [2 /*return*/, result];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getActivitiesByCategory = function (type) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITIES)
                                .select("*", "organisations.name as organisation", "activities.name as activity", "activities.id as activity_id")
                                .innerJoin(tables_1.TABLES.ORGANISATIONS, "activities.organisation_id", "organisations.id")
                                .where("activities.date", ">", new Date())
                                .orderBy("".concat(tables_1.TABLES.ACTIVITIES, ".date"), "asc")
                                .andWhere("activities.type", type)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postActivityApplication = function (uid, activityId, user) { return __awaiter(_this, void 0, void 0, function () {
            var trx, isAppliedBefore, userResult, applicationResult, userResult, applicationResult, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        trx = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 14, , 16]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .select()
                                .where("user_id", uid)
                                .andWhere("activity_id", activityId)
                                .first()];
                    case 3:
                        isAppliedBefore = _a.sent();
                        if (!(isAppliedBefore && !isAppliedBefore.is_cancelled)) return [3 /*break*/, 5];
                        // console.log("sir this way 2 ActivityService.ts L76");
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        // console.log("sir this way 2 ActivityService.ts L76");
                        _a.sent();
                        return [2 /*return*/, { message: "Applied before" }];
                    case 5:
                        if (!(isAppliedBefore && isAppliedBefore.is_cancelled)) return [3 /*break*/, 9];
                        return [4 /*yield*/, trx(tables_1.TABLES.USERS)
                                .update(user)
                                .update("updated_at", this.knex.fn.now())
                                .where("id", uid)
                                .returning("*")];
                    case 6:
                        userResult = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .update({
                                is_cancelled: false,
                                updated_at: new Date(),
                            })
                                .where("user_id", uid)
                                .andWhere("activity_id", activityId)
                                .returning("*")];
                    case 7:
                        applicationResult = _a.sent();
                        // console.log(applicationResult[0], "ActivityService.ts L95");
                        return [4 /*yield*/, trx.commit()];
                    case 8:
                        // console.log(applicationResult[0], "ActivityService.ts L95");
                        _a.sent();
                        return [2 /*return*/, { userResult: userResult[0], applicationResult: applicationResult[0] }];
                    case 9: return [4 /*yield*/, trx(tables_1.TABLES.USERS)
                            .update(user)
                            .update("updated_at", this.knex.fn.now())
                            .where("id", uid)
                            .returning("*")];
                    case 10:
                        userResult = _a.sent();
                        return [4 /*yield*/, trx(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .insert({
                                user_id: uid,
                                activity_id: activityId,
                            })
                                .returning("*")];
                    case 11:
                        applicationResult = _a.sent();
                        // console.log(applicationResult[0], "ActivityService.ts L112");
                        return [4 /*yield*/, trx.commit()];
                    case 12:
                        // console.log(applicationResult[0], "ActivityService.ts L112");
                        _a.sent();
                        return [2 /*return*/, { userResult: userResult[0], applicationResult: applicationResult[0] }];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [4 /*yield*/, trx.rollback()];
                    case 15:
                        _a.sent();
                        throw e_4;
                    case 16: return [2 /*return*/];
                }
            });
        }); };
        this.putActivityApplication = function (uid, activityId) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .update({
                                is_approved: false,
                                is_cancelled: true,
                                updated_at: new Date(),
                            })
                                .where("user_id", uid)
                                .andWhere("activity_id", activityId)
                                .returning("*")];
                    case 1:
                        result = _a.sent();
                        // console.log(result[0], "ActivityService.ts L134");
                        return [2 /*return*/, result[0]];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return ActivityService;
}());
exports.ActivityService = ActivityService;
//# sourceMappingURL=ActivityService.js.map