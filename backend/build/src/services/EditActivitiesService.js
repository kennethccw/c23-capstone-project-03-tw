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
exports.EditActivitiesService = void 0;
var EditActivitiesService = /** @class */ (function () {
    function EditActivitiesService(knex) {
        this.knex = knex;
    }
    EditActivitiesService.prototype.addActivities = function (activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, count, remaining_place, fee, newFile, type, organisation_id) {
        return __awaiter(this, void 0, void 0, function () {
            var newlyCreatedActivityID, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex
                                .insert({
                                name: activityName,
                                description: activityDetails,
                                date: date,
                                start_time: activityStartTime,
                                end_time: activityEndTime,
                                requirement: requirements,
                                district: district,
                                location: address,
                                total_place: count,
                                fee: fee,
                                image: newFile,
                                type: type,
                                remaining_place: remaining_place,
                                organisation_id: organisation_id
                            })
                                .into("activities").returning("id")];
                    case 1:
                        newlyCreatedActivityID = _a.sent();
                        // console.log(newlyCreatedActivityID, "EditAcitivitiesService.ts L24")
                        return [2 /*return*/, newlyCreatedActivityID];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditActivitiesService.prototype.getActivities = function (organisationId) {
        return __awaiter(this, void 0, void 0, function () {
            var getActivitiesResult, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex.select('*', "organisations.name as organisation", "activities.name as activity", "activities.id as activity_id").from('activities').join('organisations', 'organisations.id', 'activities.organisation_id').where('organisation_id', organisationId).where('is_deleted', false).orderBy(['date', { column: 'start_time', order: 'asc' }])
                            //select activities.id,activities.name,activities.description,activities.date,activities.location,activities.remaining_place,activities.organisation_id,organisations.name from activities join organisations on organisations.id=activities.organisation_id;
                            // console.log(getActivitiesResult, 'EditActivitiesService.ts L43')
                        ];
                    case 1:
                        getActivitiesResult = _a.sent();
                        //select activities.id,activities.name,activities.description,activities.date,activities.location,activities.remaining_place,activities.organisation_id,organisations.name from activities join organisations on organisations.id=activities.organisation_id;
                        // console.log(getActivitiesResult, 'EditActivitiesService.ts L43')
                        return [2 /*return*/, getActivitiesResult];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    EditActivitiesService.prototype.deleteActivities = function (activityID, organisationID) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteActivitiesResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.update('is_deleted', true).from('activities').where('organisation_id', organisationID).where('id', activityID).returning('is_deleted')
                        // console.log(deleteActivitiesResult, 'EditAcitivitiesService.ts L69')
                    ];
                    case 1:
                        deleteActivitiesResult = _a.sent();
                        // console.log(deleteActivitiesResult, 'EditAcitivitiesService.ts L69')
                        return [2 /*return*/, deleteActivitiesResult];
                }
            });
        });
    };
    return EditActivitiesService;
}());
exports.EditActivitiesService = EditActivitiesService;
//# sourceMappingURL=EditActivitiesService.js.map