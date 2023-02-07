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
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var trx, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.transaction()];
                case 1:
                    trx = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 7]);
                    return [4 /*yield*/, trx("pets").insert([
                            {
                                image: "pet-boss.jpeg",
                                name: "Boss",
                                age: "2-3 個月",
                                weight: 1.8,
                                gender: "male",
                                breed: "英短",
                                remark: "1針  / 非常乖 / 任摸任抱 / 識砂盆便便 / 但時會屙係地。",
                                organisation_id: 1,
                            },
                            {
                                image: "pet-moggie.png",
                                name: "Moggie",
                                age: "2-4 歲",
                                weight: 3,
                                gender: "male",
                                breed: "英國短毛",
                                remark: "曾患Fip / 已經康復及有心臟問題。",
                                organisation_id: 1,
                            },
                            {
                                image: "pet-momo.png",
                                name: "Momo",
                                age: "2-4 歲",
                                weight: 5,
                                gender: "male",
                                breed: "唐狗",
                                remark: "齊針 / 已絕育 / 非常乖。",
                                organisation_id: 1,
                            },
                            {
                                image: "pet-sleepy.png",
                                name: "Sleepy",
                                age: "3 個月",
                                weight: 10,
                                gender: "female",
                                breed: "唐狗",
                                remark: "未絕育 / 已打一針 / 已杜蟲杜蝨。",
                                organisation_id: 2,
                            },
                            {
                                image: "pet-kelly.png",
                                name: "Kelly",
                                age: "13 歲",
                                weight: 4.5,
                                gender: "female",
                                breed: "土耳其安哥拉貓)",
                                remark: "已絕育 / 年長貓 / 健康。",
                                organisation_id: 2,
                            },
                            {
                                image: "pet-meme.png",
                                name: "MeMe",
                                age: "14 歲",
                                weight: 4.5,
                                gender: "female",
                                breed: "英國短毛貓 & 蘇格蘭摺耳貓",
                                remark: "已絕育 / 年長貓 / 健康。",
                                organisation_id: 2,
                            },
                            {
                                image: "pet-為食仔.png",
                                name: "為食仔",
                                age: "8-9 歲",
                                weight: 5,
                                gender: "male",
                                breed: "蘇格蘭摺耳貓",
                                remark: "為食仔係摺耳貓，養前要了解佢有基因缺陷既問題，同埋需要特別留意同護理既事項！佢依家需要食腎糧同腎臟既supplements，要定期清潔耳仔。",
                                organisation_id: 3,
                            },
                            {
                                image: "pet-himhim.png",
                                name: "Him Him",
                                age: "1-2 歲",
                                weight: 5,
                                gender: "female",
                                breed: "唐貓",
                                remark: "已絕育 / 溫馴 / 可摸 / 為食。",
                                organisation_id: 3,
                            },
                            {
                                image: "pet-coco.png",
                                name: "Co Co",
                                age: "2 個月",
                                weight: 2,
                                gender: "female",
                                breed: "唐貓",
                                remark: "溫馴 / 可摸 / 為食。",
                                organisation_id: 4,
                            },
                            {
                                image: "pet-blue.jpeg",
                                name: "Blue",
                                age: "1 歲",
                                weight: 4,
                                gender: "male",
                                breed: "唐貓",
                                remark: "溫馴 / 乖巧 / 喜歡觀察 / 穩定。",
                                organisation_id: 4,
                            },
                        ])];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, trx.commit()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [4 /*yield*/, trx.rollback()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
//# sourceMappingURL=14_TABLES.PETS.js.map