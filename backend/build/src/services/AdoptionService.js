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
exports.AdoptionService = void 0;
var models_1 = require("../utils/models");
var tables_1 = require("../utils/tables");
var AdoptionService = /** @class */ (function () {
    function AdoptionService(knex) {
        var _this = this;
        this.knex = knex;
        this.getPetAdoption = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hihihi");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PETS)
                                .select("*", "pets.id as pet_id", "organisations.name as organisation", "pets.name as name")
                                .innerJoin(tables_1.TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id")
                                .first()
                                .where("pets.id", id)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postPetAdoptionApplication = function (adoptionApplication) { return __awaiter(_this, void 0, void 0, function () {
            var isAppliedBefore, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hihihi");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADOPTION_APPLICATIONS)
                                .select()
                                .where("user_id", adoptionApplication.user_id)
                                .andWhere("pet_id", adoptionApplication.pet_id)
                                .first()];
                    case 2:
                        isAppliedBefore = _a.sent();
                        console.log(isAppliedBefore);
                        if (isAppliedBefore && isAppliedBefore.status !== models_1.AdoptionResultStatus.cancelled) {
                            return [2 /*return*/, "Applied Before"];
                        }
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADOPTION_APPLICATIONS)
                                .insert(adoptionApplication)
                                .returning("*")];
                    case 3:
                        result = _a.sent();
                        console.log(result[0]);
                        return [2 /*return*/, result[0]];
                    case 4:
                        e_2 = _a.sent();
                        console.log(e_2);
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.putPetAdoptionApplication = function (user_id, pet_id) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hihihi");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADOPTION_APPLICATIONS)
                                .update({ status: "cancelled", updated_at: new Date() })
                                .where("user_id", user_id)
                                .andWhere("pet_id", pet_id)
                                .returning("*")];
                    case 2:
                        result = _a.sent();
                        console.log(result[0]);
                        return [2 /*return*/, result[0]];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getAllPetAdoption = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("hihihi");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.PETS)
                                .select("*", "organisations.name as organisation", "pets.name as name", "pets.id as pet_id")
                                .innerJoin(tables_1.TABLES.ORGANISATIONS, "pets.organisation_id", "organisations.id")];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 3:
                        e_4 = _a.sent();
                        console.log(e_4);
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getPetAdoptionResult = function (uid) { return __awaiter(_this, void 0, void 0, function () {
            var result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex(tables_1.TABLES.ADOPTION_APPLICATIONS)
                                .select("*", "".concat(tables_1.TABLES.ADOPTION_APPLICATIONS, ".id as application_id"), "".concat(tables_1.TABLES.PETS, ".id as pet_id"))
                                .innerJoin(tables_1.TABLES.PETS, "".concat(tables_1.TABLES.ADOPTION_APPLICATIONS, ".pet_id"), "".concat(tables_1.TABLES.PETS, ".id"))
                                .where("".concat(tables_1.TABLES.ADOPTION_APPLICATIONS, ".user_id"), uid)
                                .andWhere("".concat(tables_1.TABLES.ADOPTION_APPLICATIONS, ".status"), "<>", models_1.AdoptionResultStatus.cancelled)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAdoptionApplication = function (organisationId) { return __awaiter(_this, void 0, void 0, function () {
            var getAdoptionApplicationResult, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex.select("adoption_applications.id as application_id", "adoption_applications.pet_id", "adoption_applications.name as applicant_name", 'pets.name as name', "pets.image", "adoption_applications.status", "adoption_applications.fail_reason", "adoption_applications.other_fail_reason", "organisations.id as organisation_id"
                            // 'adoption_applications.id as application_id','adoption_applications.name','adoption_applications.user_id','adoption_applications.created_at', 'pets.name as pet_name', "pets.image"
                            )
                                .from('adoption_applications')
                                .innerJoin('pets', 'pets.id', 'adoption_applications.pet_id').join('organisations', 'organisations.id', 'pets.organisation_id')
                                .where('organisation_id', organisationId)
                            // let distinctPetName=await this.knex.distinct<AdoptionApplication[]>('pets.name as pet_name')
                            // .from('adoption_applications')
                            // .join('pets', 'pets.id', 'adoption_applications.pet_id').join('organisations', 'organisations.id','pets.organisation_id').where('organisation_id', organisationId).where('status','pending')
                            // SELECT adoption_applications.name,status,pet_id,organisation_id from adoption_applications join pets on adoption_applications.pet_id=pets.id join organisations on organisation_id=organisations.id where organisation_id=1 and status='pending';
                            // console.log(getAdoptionApplicationResult, 'AdoptionService.ts L107-------------------------------')
                            // console.log(getAdoptionApplicationResult.length,' pending+fail case AdoptionService.ts L114' )
                        ];
                    case 1:
                        getAdoptionApplicationResult = _a.sent();
                        // let distinctPetName=await this.knex.distinct<AdoptionApplication[]>('pets.name as pet_name')
                        // .from('adoption_applications')
                        // .join('pets', 'pets.id', 'adoption_applications.pet_id').join('organisations', 'organisations.id','pets.organisation_id').where('organisation_id', organisationId).where('status','pending')
                        // SELECT adoption_applications.name,status,pet_id,organisation_id from adoption_applications join pets on adoption_applications.pet_id=pets.id join organisations on organisation_id=organisations.id where organisation_id=1 and status='pending';
                        // console.log(getAdoptionApplicationResult, 'AdoptionService.ts L107-------------------------------')
                        // console.log(getAdoptionApplicationResult.length,' pending+fail case AdoptionService.ts L114' )
                        return [2 /*return*/, getAdoptionApplicationResult];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        throw e_6;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.approveAdoption = function (applicationID, animalID) { return __awaiter(_this, void 0, void 0, function () {
            var txn, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.knex.transaction()];
                    case 1:
                        txn = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 8]);
                        console.log(applicationID, "AdoptiopnService.ts L154");
                        return [4 /*yield*/, txn("adoption_applications").update("status", 'success').where("id", applicationID)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, txn("adoption_applications").update("status", 'fail').where('pet_id', animalID).whereNot("id", applicationID)];
                    case 4:
                        _a.sent();
                        console.log('updated status of the application     AdoptiopnService.ts L159');
                        return [4 /*yield*/, txn.commit()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                    case 6:
                        e_7 = _a.sent();
                        console.log(e_7);
                        return [4 /*yield*/, txn.rollback()];
                    case 7:
                        _a.sent();
                        throw (e_7);
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.rejectAdoption = function (applicationID, rejectedReason, otherReason) { return __awaiter(_this, void 0, void 0, function () {
            var e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.knex("adoption_applications").update({
                                status: "fail",
                                fail_reason: rejectedReason,
                                other_fail_reason: otherReason,
                            }).where('id', applicationID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        e_8 = _a.sent();
                        console.log(e_8);
                        throw e_8;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return AdoptionService;
}());
exports.AdoptionService = AdoptionService;
//# sourceMappingURL=AdoptionService.js.map