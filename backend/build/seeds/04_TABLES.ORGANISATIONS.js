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
exports.seed = void 0;
var hash_1 = require("../src/utils/hash");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, _a, _b, _c, e_1;
        var _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0: return [4 /*yield*/, knex.transaction()];
                case 1:
                    trx = _l.sent();
                    _l.label = 2;
                case 2:
                    _l.trys.push([2, 12, , 14]);
                    _b = (_a = trx("organisations")).insert;
                    _d = {
                        logo: "organisation1.png",
                        name: "香港動物群益會",
                        email: "hkaca01@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 3:
                    _c = [
                        (_d.password = _l.sent(),
                            _d.mobile = "25272527",
                            _d.address = "香港旺角駱克道三號",
                            _d.district_org = "kowloon",
                            _d)
                    ];
                    _e = {
                        logo: "organisation2.png",
                        name: "保護動物協會",
                        email: "volunteer02@protectanimal.org.hk"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 4:
                    _c = _c.concat([
                        (_e.password = _l.sent(),
                            _e.mobile = "28002800",
                            _e.address = "香港灣仔中心 (總部)",
                            _e.district_org = "hong_kong_island",
                            _e)
                    ]);
                    _f = {
                        logo: "organisation4.png",
                        name: "保護遺棄貓狗協會",
                        email: "pcd03@pcd.org.hk"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 5:
                    _c = _c.concat([
                        (_f.password = _l.sent(),
                            _f.mobile = "28382838",
                            _f.address = "新界元朗僑興路白沙村第一段",
                            _f.district_org = "new_territories",
                            _f)
                    ]);
                    _g = {
                        logo: "organisation3.png",
                        name: "香港關愛庇護動物之家",
                        email: "volunteer.lovepet04@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 6:
                    _c = _c.concat([
                        (_g.password = _l.sent(),
                            _g.mobile = "28426812",
                            _g.address = "新界屯門屏山鄉后海灣濱",
                            _g.district_org = "new_territories",
                            _g)
                    ]);
                    _h = {
                        logo: "organisation5.png",
                        name: "貓貓狗狗保護園",
                        email: "HongKongAnimalLover@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 7:
                    _c = _c.concat([
                        (_h.password = _l.sent(),
                            _h.mobile = "28424234",
                            _h.address = "屯門青山公路藍地段",
                            _h.district_org = "new_territories",
                            _h)
                    ]);
                    _j = {
                        logo: "organisation6.png",
                        name: "動物救援之家",
                        email: "AnimalShelter@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 8:
                    _c = _c.concat([
                        (_j.password = _l.sent(),
                            _j.mobile = "67125234",
                            _j.address = "荃灣荃運工業大廈2期",
                            _j.district_org = "kowloon",
                            _j)
                    ]);
                    _k = {
                        logo: "organisation7.png",
                        name: "流浪動物之家",
                        email: "PetShelter@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("12345678")];
                case 9: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                            (_k.password = _l.sent(),
                                _k.mobile = "35375234",
                                _k.address = "灣仔晏頓街1號安定大廈1樓",
                                _k.district_org = "hong_kong_island",
                                _k)
                        ])])];
                case 10:
                    _l.sent();
                    return [4 /*yield*/, trx.commit()];
                case 11:
                    _l.sent();
                    return [3 /*break*/, 14];
                case 12:
                    e_1 = _l.sent();
                    console.log(e_1);
                    return [4 /*yield*/, trx.rollback()];
                case 13:
                    _l.sent();
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
//# sourceMappingURL=04_TABLES.ORGANISATIONS.js.map