"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.AdoptionController = void 0;
var AdoptionController = /** @class */ (function () {
    function AdoptionController(adoptionService) {
        var _this = this;
        this.adoptionService = adoptionService;
        this.getPetAdoption = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = parseInt(req.query.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.adoptionService.getPetAdoption(id)];
                    case 2:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postPetAdoptionApplication = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, adoptionApplication, adoptionApplicationWithUid, data, e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        adoptionApplication = req.body.adoptionApplication;
                        adoptionApplicationWithUid = __assign(__assign({}, adoptionApplication), { user_id: user_id });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.adoptionService.postPetAdoptionApplication(adoptionApplicationWithUid)];
                    case 2:
                        data = _b.sent();
                        if (data === "Applied Before") {
                            res.status(200).json({ message: "Applied Before" });
                            return [2 /*return*/];
                        }
                        res.status(200).json(data);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.putPetAdoptionApplication = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var user_id, pet_id, data, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        user_id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        pet_id = req.body.petId;
                        return [4 /*yield*/, this.adoptionService.putPetAdoptionApplication(user_id, pet_id)];
                    case 1:
                        data = _b.sent();
                        if (data === "Applied Before") {
                            res.status(200).json({ message: "Applied Before" });
                            return [2 /*return*/];
                        }
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAllPetAdoption = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.adoptionService.getAllPetAdoption()];
                    case 1:
                        data = _a.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPetAdoptionResult = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid, data, e_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        uid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, this.adoptionService.getPetAdoptionResult(uid)];
                    case 1:
                        data = _b.sent();
                        res.status(200).json(data);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAdoptionApplication = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var organisationId, getAdoptionApplicationResult, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        organisationId = parseInt(req.params.organisationID);
                        return [4 /*yield*/, this.adoptionService.getAdoptionApplication(organisationId)
                            // console.log(getAdoptionApplicationResult, 'AdoptionController.ts L74',)
                        ];
                    case 1:
                        getAdoptionApplicationResult = _a.sent();
                        // console.log(getAdoptionApplicationResult, 'AdoptionController.ts L74',)
                        res.status(200).json(getAdoptionApplicationResult);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.approveAdoption = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, applicationID, animalID, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, applicationID = _a.applicationID, animalID = _a.animalID;
                        console.log(applicationID, 'AdoptionController.ts L85');
                        return [4 /*yield*/, this.adoptionService.approveAdoption(applicationID, animalID)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: "已批准申請及拒絕其他人對此的申請" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.rejectAdoption = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, applicationID, rejectedReason, otherReason, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, applicationID = _a.applicationID, rejectedReason = _a.rejectedReason, otherReason = _a.otherReason;
                        console.log("applicationID:", applicationID);
                        console.log("rejectedReason:", rejectedReason);
                        console.log('otherReason:', otherReason);
                        return [4 /*yield*/, this.adoptionService.rejectAdoption(applicationID, rejectedReason, otherReason)];
                    case 1:
                        _b.sent();
                        res.status(200).json({ message: "已拒絕申請" });
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return AdoptionController;
}());
exports.AdoptionController = AdoptionController;
//# sourceMappingURL=AdoptionController.js.map