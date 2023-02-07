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
exports.VolunteerRecordService = void 0;
var tables_1 = require("../utils/tables");
var VolunteerRecordService = /** @class */ (function () {
    function VolunteerRecordService(knex) {
        var _this = this;
        this.knex = knex;
        this.getVolunteerHistory = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var onBoardResult, onBoardDate, participatedResult, approvedResult, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log(uid);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.USERS)
                                .select("created_at")
                                .where("id", uid)
                                .first()];
                    case 1:
                        onBoardResult = _a.sent();
                        onBoardDate = onBoardResult.created_at;
                        console.log(onBoardDate);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .select("".concat(tables_1.TABLES.ACTIVITIES, ".name as activity_name"), "".concat(tables_1.TABLES.ACTIVITIES, ".date as activity_date"), "".concat(tables_1.TABLES.ACTIVITIES, ".start_time as activity_start_time"), "".concat(tables_1.TABLES.ACTIVITIES, ".end_time as activity_end_time"))
                                .innerJoin(tables_1.TABLES.ACTIVITIES, "".concat(tables_1.TABLES.ACTIVITIES, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".activity_id"))
                                .orderBy("".concat(tables_1.TABLES.ACTIVITIES, ".date"), "asc")
                                .where("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".user_id"), uid)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_participated"), true)];
                    case 2:
                        participatedResult = _a.sent();
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ACTIVITY_APPLICATIONS)
                                .select("".concat(tables_1.TABLES.ACTIVITIES, ".name as activity_name"), "".concat(tables_1.TABLES.ACTIVITIES, ".date as activity_date"), "".concat(tables_1.TABLES.ACTIVITIES, ".start_time as activity_start_time"), "".concat(tables_1.TABLES.ACTIVITIES, ".end_time as activity_end_time"))
                                .innerJoin(tables_1.TABLES.ACTIVITIES, "".concat(tables_1.TABLES.ACTIVITIES, ".id"), "".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".activity_id"))
                                .orderBy("".concat(tables_1.TABLES.ACTIVITIES, ".date"), "asc")
                                .where("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".user_id"), uid)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_approved"), true)
                                .andWhere("".concat(tables_1.TABLES.ACTIVITY_APPLICATIONS, ".is_participated"), false)];
                    case 3:
                        approvedResult = _a.sent();
                        return [2 /*return*/, { onBoardDate: onBoardDate, approvedResult: approvedResult, participatedResult: participatedResult }];
                    case 4:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return VolunteerRecordService;
}());
exports.VolunteerRecordService = VolunteerRecordService;
//# sourceMappingURL=VolunteerRecordService.js.map