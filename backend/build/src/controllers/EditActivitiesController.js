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
exports.EditActivitiesController = void 0;
var EditActivitiesController = /** @class */ (function () {
    //@ts-ignore
    function EditActivitiesController(editActivitiesService) {
        var _this = this;
        this.editActivitiesService = editActivitiesService;
        this.addActivities = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, count, remaining_place, fee, file, newFile, type, organisation_id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        activityName = req.form.fields.activityName;
                        activityDetails = req.form.fields.activityDetails;
                        date = req.form.fields.date;
                        activityStartTime = req.form.fields.activityStartTime;
                        activityEndTime = req.form.fields.activityEndTime;
                        requirements = req.form.fields.requirements;
                        district = req.form.fields.district;
                        address = req.form.fields.address;
                        count = req.form.fields.count;
                        remaining_place = req.form.fields.remaining_place;
                        fee = req.form.fields.fee;
                        file = req.form.files['file'];
                        newFile = file.newFilename;
                        type = req.form.fields.type;
                        organisation_id = req.form.fields.organisation_id;
                        return [4 /*yield*/, this.editActivitiesService.addActivities(activityName, activityDetails, date, activityStartTime, activityEndTime, requirements, district, address, parseInt(count), parseInt(remaining_place), parseInt(fee), newFile, type, parseInt(organisation_id))];
                    case 1:
                        _a.sent();
                        res.status(200).json({ message: "新增成功!" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getActivities = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var organisationId, getActivitiesResult, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        organisationId = parseInt(req.params.organisationID);
                        return [4 /*yield*/, this.editActivitiesService.getActivities(organisationId)
                            // console.log(getActivitiesResult, 'EditActivitiesController.ts L44')
                        ];
                    case 1:
                        getActivitiesResult = _a.sent();
                        // console.log(getActivitiesResult, 'EditActivitiesController.ts L44')
                        res.status(200).json(getActivitiesResult);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteActivities = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, activityID, organisationID, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, activityID = _a.activityID, organisationID = _a.organisationID;
                        // console.log(activityID,organisationID, 'EditActivitiesController.ts L55')
                        return [4 /*yield*/, this.editActivitiesService.deleteActivities(activityID, organisationID)
                            // console.log(deleteActivitiesResult, 'EditActivitiesController.ts L57')
                        ];
                    case 1:
                        // console.log(activityID,organisationID, 'EditActivitiesController.ts L55')
                        _b.sent();
                        // console.log(deleteActivitiesResult, 'EditActivitiesController.ts L57')
                        res.status(200).json({ result: "deleted successfully !" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return EditActivitiesController;
}());
exports.EditActivitiesController = EditActivitiesController;
//# sourceMappingURL=EditActivitiesController.js.map