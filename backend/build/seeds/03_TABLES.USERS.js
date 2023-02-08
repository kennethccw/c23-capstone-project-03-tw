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
        var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
        return __generator(this, function (_24) {
            switch (_24.label) {
                case 0: return [4 /*yield*/, knex.transaction()];
                case 1:
                    trx = _24.sent();
                    _24.label = 2;
                case 2:
                    _24.trys.push([2, 50, , 52]);
                    _b = (_a = trx("users")).insert;
                    _d = {
                        username: "lovepetuser01",
                        email: "lovepetuser01@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 3:
                    _c = [
                        (_d.password = _24.sent(),
                            _d.mobile = "12345678",
                            _d.birthday = "09-09-1997",
                            _d.gender = "female",
                            _d.is_experienced = false,
                            _d.fullname = "陳大文",
                            _d)
                    ];
                    _e = {
                        username: "lovepetuser02",
                        email: "lovepetuser02@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 4:
                    _c = _c.concat([
                        (_e.password = _24.sent(),
                            _e.mobile = "12345678",
                            _e.birthday = "09-09-1993",
                            _e.gender = "male",
                            _e.is_experienced = true,
                            _e.fullname = "陳小文",
                            _e)
                    ]);
                    _f = {
                        username: "lovepetuser03",
                        email: "lovepetuser03@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 5:
                    _c = _c.concat([
                        (_f.password = _24.sent(),
                            _f.mobile = "12345678",
                            _f.birthday = "09-09-2005",
                            _f.gender = "female",
                            _f.is_experienced = true,
                            _f.fullname = "陳忠文",
                            _f)
                    ]);
                    _g = {
                        username: "lovepetuser04",
                        email: "lovepetuser04@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 6:
                    _c = _c.concat([
                        (_g.password = _24.sent(),
                            _g.mobile = "12345678",
                            _g.birthday = "09-09-2001",
                            _g.gender = "male",
                            _g.is_experienced = true,
                            _g.fullname = "陳世文",
                            _g)
                    ]);
                    _h = {
                        username: "lovepetuser05",
                        email: "lovepetuser05@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 7:
                    _c = _c.concat([
                        (_h.password = _24.sent(),
                            _h.mobile = "12345678",
                            _h.birthday = "09-09-1993",
                            _h.gender = "male",
                            _h.is_experienced = true,
                            _h.fullname = "陳細文",
                            _h)
                    ]);
                    _j = {
                        username: "lovepetuser06",
                        email: "lovepetuser06@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 8:
                    _c = _c.concat([
                        (_j.password = _24.sent(),
                            _j.mobile = "12345678",
                            _j.birthday = "09-09-1899",
                            _j.gender = "male",
                            _j.is_experienced = true,
                            _j.fullname = "陳中文",
                            _j)
                    ]);
                    _k = {
                        username: "lovepetuser07",
                        email: "lovepetuser07@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 9:
                    _c = _c.concat([
                        (_k.password = _24.sent(),
                            _k.mobile = "12345678",
                            _k.birthday = "09-09-1999",
                            _k.gender = "male",
                            _k.is_experienced = true,
                            _k.fullname = "陳英文",
                            _k)
                    ]);
                    _l = {
                        username: "lovepetuser08",
                        email: "lovepetuser08@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 10:
                    _c = _c.concat([
                        (_l.password = _24.sent(),
                            _l.mobile = "12345678",
                            _l.birthday = "01-03-1999",
                            _l.gender = "male",
                            _l.is_experienced = true,
                            _l.fullname = "陳巨文",
                            _l)
                    ]);
                    _m = {
                        username: "lovepetuser09",
                        email: "lovepetuser09@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 11:
                    _c = _c.concat([
                        (_m.password = _24.sent(),
                            _m.mobile = "12345678",
                            _m.birthday = "09-09-2004",
                            _m.gender = "female",
                            _m.is_experienced = true,
                            _m.fullname = "陳具文",
                            _m)
                    ]);
                    _o = {
                        username: "lovepetuser010",
                        email: "lovepetuser10@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 12:
                    _c = _c.concat([
                        (_o.password = _24.sent(),
                            _o.mobile = "12345678",
                            _o.birthday = "09-03-1905",
                            _o.gender = "male",
                            _o.is_experienced = true,
                            _o.fullname = "陳思文",
                            _o)
                    ]);
                    _p = {
                        username: "lovepetuser11",
                        email: "lovepetuser11@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 13:
                    _c = _c.concat([
                        (_p.password = _24.sent(),
                            _p.mobile = "12345678",
                            _p.birthday = "03-08-1991",
                            _p.gender = "male",
                            _p.is_experienced = true,
                            _p.fullname = "陳斯文",
                            _p)
                    ]);
                    _q = {
                        username: "lovepetuser12",
                        email: "lovepetuser12@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 14:
                    _c = _c.concat([
                        (_q.password = _24.sent(),
                            _q.mobile = "12345678",
                            _q.birthday = "09-09-1989",
                            _q.gender = "female",
                            _q.is_experienced = true,
                            _q.fullname = "陳絲文",
                            _q)
                    ]);
                    _r = {
                        username: "lovepetuser13",
                        email: "lovepetuser13@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 15:
                    _c = _c.concat([
                        (_r.password = _24.sent(),
                            _r.mobile = "12345678",
                            _r.birthday = "09-02-1999",
                            _r.gender = "female",
                            _r.is_experienced = true,
                            _r.fullname = "陳文",
                            _r)
                    ]);
                    _s = {
                        username: "lovepetuser14",
                        email: "lovepetuser14@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 16:
                    _c = _c.concat([
                        (_s.password = _24.sent(),
                            _s.mobile = "12345678",
                            _s.birthday = "09-09-2001",
                            _s.gender = "female",
                            _s.is_experienced = true,
                            _s.fullname = "陳加文",
                            _s)
                    ]);
                    _t = {
                        username: "lovepetuser15",
                        email: "lovepetuser15@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 17:
                    _c = _c.concat([
                        (_t.password = _24.sent(),
                            _t.mobile = "12345678",
                            _t.birthday = "01-04-1989",
                            _t.gender = "male",
                            _t.is_experienced = true,
                            _t.fullname = "陳嘉文",
                            _t)
                    ]);
                    _u = {
                        username: "lovepetuser16",
                        email: "lovepetuser16@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 18:
                    _c = _c.concat([
                        (_u.password = _24.sent(),
                            _u.mobile = "12345678",
                            _u.birthday = "09-02-1989",
                            _u.gender = "female",
                            _u.is_experienced = true,
                            _u.fullname = "陳乘文",
                            _u)
                    ]);
                    _v = {
                        username: "lovepetuser17",
                        email: "lovepetuser17@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 19:
                    _c = _c.concat([
                        (_v.password = _24.sent(),
                            _v.mobile = "12345678",
                            _v.birthday = "09-03-1992",
                            _v.gender = "female",
                            _v.is_experienced = true,
                            _v.fullname = "陳成文",
                            _v)
                    ]);
                    _w = {
                        username: "lovepetuser18",
                        email: "lovepetuser18@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 20:
                    _c = _c.concat([
                        (_w.password = _24.sent(),
                            _w.mobile = "12345678",
                            _w.birthday = "09-02-1990",
                            _w.gender = "male",
                            _w.is_experienced = true,
                            _w.fullname = "陳承文",
                            _w)
                    ]);
                    _x = {
                        username: "lovepetuser19",
                        email: "lovepetuser19@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 21:
                    _c = _c.concat([
                        (_x.password = _24.sent(),
                            _x.mobile = "12345678",
                            _x.birthday = "09-02-1991",
                            _x.gender = "male",
                            _x.is_experienced = true,
                            _x.fullname = "陳除文",
                            _x)
                    ]);
                    _y = {
                        username: "lovepetuser20",
                        email: "lovepetuser20@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 22:
                    _c = _c.concat([
                        (_y.password = _24.sent(),
                            _y.mobile = "12345678",
                            _y.birthday = "01-02-1991",
                            _y.gender = "female",
                            _y.is_experienced = true,
                            _y.fullname = "陳隨文",
                            _y)
                    ]);
                    _z = {
                        username: "lovepetuser21",
                        email: "lovepetuser21@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 23:
                    _c = _c.concat([
                        (_z.password = _24.sent(),
                            _z.mobile = "12345678",
                            _z.birthday = "01-02-1891",
                            _z.gender = "female",
                            _z.is_experienced = true,
                            _z.fullname = "陳法文",
                            _z)
                    ]);
                    _0 = {
                        username: "lovepetuser22",
                        email: "lovepetuser22@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 24:
                    _c = _c.concat([
                        (_0.password = _24.sent(),
                            _0.mobile = "12345678",
                            _0.birthday = "01-02-1993",
                            _0.gender = "female",
                            _0.is_experienced = true,
                            _0.fullname = "陳德文",
                            _0)
                    ]);
                    _1 = {
                        username: "lovepetuser23",
                        email: "lovepetuser23@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 25:
                    _c = _c.concat([
                        (_1.password = _24.sent(),
                            _1.mobile = "12345678",
                            _1.birthday = "01-02-1992",
                            _1.gender = "male",
                            _1.is_experienced = true,
                            _1.fullname = "陳美文",
                            _1)
                    ]);
                    _2 = {
                        username: "lovepetuser24",
                        email: "lovepetuser24@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 26:
                    _c = _c.concat([
                        (_2.password = _24.sent(),
                            _2.mobile = "12345678",
                            _2.birthday = "01-02-1991",
                            _2.gender = "female",
                            _2.is_experienced = true,
                            _2.fullname = "陳俄文",
                            _2)
                    ]);
                    _3 = {
                        username: "lovepetuser25",
                        email: "lovepetuser25@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 27:
                    _c = _c.concat([
                        (_3.password = _24.sent(),
                            _3.mobile = "12345678",
                            _3.birthday = "01-02-1891",
                            _3.gender = "female",
                            _3.is_experienced = true,
                            _3.fullname = "陳國文",
                            _3)
                    ]);
                    _4 = {
                        username: "lovepetuser26",
                        email: "lovepetuser26@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 28:
                    _c = _c.concat([
                        (_4.password = _24.sent(),
                            _4.mobile = "12345678",
                            _4.birthday = "01-02-1891",
                            _4.gender = "female",
                            _4.is_experienced = true,
                            _4.fullname = "陳日文",
                            _4)
                    ]);
                    _5 = {
                        username: "lovepetuser27",
                        email: "lovepetuser27@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 29:
                    _c = _c.concat([
                        (_5.password = _24.sent(),
                            _5.mobile = "12345678",
                            _5.birthday = "01-02-1891",
                            _5.gender = "female",
                            _5.is_experienced = true,
                            _5.fullname = "陳手文",
                            _5)
                    ]);
                    _6 = {
                        username: "lovepetuser28",
                        email: "lovepetuser28@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 30:
                    _c = _c.concat([
                        (_6.password = _24.sent(),
                            _6.mobile = "12345678",
                            _6.birthday = "01-02-1891",
                            _6.gender = "female",
                            _6.is_experienced = true,
                            _6.fullname = "陳田文",
                            _6)
                    ]);
                    _7 = {
                        username: "lovepetuser29",
                        email: "lovepetuser29@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 31:
                    _c = _c.concat([
                        (_7.password = _24.sent(),
                            _7.mobile = "12345678",
                            _7.birthday = "01-02-1891",
                            _7.gender = "female",
                            _7.is_experienced = true,
                            _7.fullname = "陳水文",
                            _7)
                    ]);
                    _8 = {
                        username: "lovepetuser30",
                        email: "lovepetuser30@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 32:
                    _c = _c.concat([
                        (_8.password = _24.sent(),
                            _8.mobile = "12345678",
                            _8.birthday = "01-02-1891",
                            _8.gender = "female",
                            _8.is_experienced = true,
                            _8.fullname = "陳口文",
                            _8)
                    ]);
                    _9 = {
                        username: "lovepetuser31",
                        email: "lovepetuser31@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 33:
                    _c = _c.concat([
                        (_9.password = _24.sent(),
                            _9.mobile = "12345678",
                            _9.birthday = "01-02-1891",
                            _9.gender = "female",
                            _9.is_experienced = true,
                            _9.fullname = "陳廿文",
                            _9)
                    ]);
                    _10 = {
                        username: "lovepetuser32",
                        email: "lovepetuser32@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 34:
                    _c = _c.concat([
                        (_10.password = _24.sent(),
                            _10.mobile = "12345678",
                            _10.birthday = "01-02-1891",
                            _10.gender = "female",
                            _10.is_experienced = true,
                            _10.fullname = "陳卜文",
                            _10)
                    ]);
                    _11 = {
                        username: "lovepetuser33",
                        email: "lovepetuser33@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 35:
                    _c = _c.concat([
                        (_11.password = _24.sent(),
                            _11.mobile = "12345678",
                            _11.birthday = "01-02-1891",
                            _11.gender = "female",
                            _11.is_experienced = true,
                            _11.fullname = "陳山文",
                            _11)
                    ]);
                    _12 = {
                        username: "lovepetuser34",
                        email: "lovepetuser34@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 36:
                    _c = _c.concat([
                        (_12.password = _24.sent(),
                            _12.mobile = "12345678",
                            _12.birthday = "01-02-1891",
                            _12.gender = "female",
                            _12.is_experienced = true,
                            _12.fullname = "陳戈文",
                            _12)
                    ]);
                    _13 = {
                        username: "lovepetuser35",
                        email: "lovepetuser35@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 37:
                    _c = _c.concat([
                        (_13.password = _24.sent(),
                            _13.mobile = "12345678",
                            _13.birthday = "01-02-1995",
                            _13.gender = "female",
                            _13.is_experienced = true,
                            _13.fullname = "陳戈文",
                            _13)
                    ]);
                    _14 = {
                        username: "lovepetuser36",
                        email: "lovepetuser36@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 38:
                    _c = _c.concat([
                        (_14.password = _24.sent(),
                            _14.mobile = "12345678",
                            _14.birthday = "01-02-1895",
                            _14.gender = "female",
                            _14.is_experienced = true,
                            _14.fullname = "陳人文",
                            _14)
                    ]);
                    _15 = {
                        username: "lovepetuser37",
                        email: "lovepetuser37@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 39:
                    _c = _c.concat([
                        (_15.password = _24.sent(),
                            _15.mobile = "12345678",
                            _15.birthday = "10-02-1997",
                            _15.gender = "female",
                            _15.is_experienced = true,
                            _15.fullname = "陳心文",
                            _15)
                    ]);
                    _16 = {
                        username: "lovepetuser38",
                        email: "lovepetuser38@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 40:
                    _c = _c.concat([
                        (_16.password = _24.sent(),
                            _16.mobile = "12345678",
                            _16.birthday = "06-12-1891",
                            _16.gender = "female",
                            _16.is_experienced = true,
                            _16.fullname = "陳木文",
                            _16)
                    ]);
                    _17 = {
                        username: "lovepetuser39",
                        email: "lovepetuser39@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 41:
                    _c = _c.concat([
                        (_17.password = _24.sent(),
                            _17.mobile = "12345678",
                            _17.birthday = "05-06-1898",
                            _17.gender = "female",
                            _17.is_experienced = true,
                            _17.fullname = "陳火文",
                            _17)
                    ]);
                    _18 = {
                        username: "lovepetuser40",
                        email: "lovepetuser40@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 42:
                    _c = _c.concat([
                        (_18.password = _24.sent(),
                            _18.mobile = "12345678",
                            _18.birthday = "11-05-1891",
                            _18.gender = "female",
                            _18.is_experienced = true,
                            _18.fullname = "陳土文",
                            _18)
                    ]);
                    _19 = {
                        username: "lovepetuser41",
                        email: "lovepetuser41@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 43:
                    _c = _c.concat([
                        (_19.password = _24.sent(),
                            _19.mobile = "12345678",
                            _19.birthday = "01-09-2003",
                            _19.gender = "female",
                            _19.is_experienced = true,
                            _19.fullname = "陳竹文",
                            _19)
                    ]);
                    _20 = {
                        username: "lovepetuser42",
                        email: "lovepetuser42@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 44:
                    _c = _c.concat([
                        (_20.password = _24.sent(),
                            _20.mobile = "12345678",
                            _20.birthday = "11-04-1993",
                            _20.gender = "female",
                            _20.is_experienced = true,
                            _20.fullname = "陳十文",
                            _20)
                    ]);
                    _21 = {
                        username: "lovepetuser43",
                        email: "lovepetuser43@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 45:
                    _c = _c.concat([
                        (_21.password = _24.sent(),
                            _21.mobile = "12345678",
                            _21.birthday = "01-02-2001",
                            _21.gender = "female",
                            _21.is_experienced = true,
                            _21.fullname = "陳難文",
                            _21)
                    ]);
                    _22 = {
                        username: "lovepetuser44",
                        email: "lovepetuser44@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("123456")];
                case 46:
                    _c = _c.concat([
                        (_22.password = _24.sent(),
                            _22.mobile = "12345678",
                            _22.birthday = "01-08-2003",
                            _22.gender = "female",
                            _22.is_experienced = true,
                            _22.fullname = "陳金文",
                            _22)
                    ]);
                    _23 = {
                        username: "kennethccw",
                        email: "kennethccw@gmail.com"
                    };
                    return [4 /*yield*/, (0, hash_1.hashPassword)("abc12345678!")];
                case 47: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                            (_23.password = _24.sent(),
                                _23.mobile = "12345678",
                                _23.birthday = "10-10-1998",
                                _23.gender = "male",
                                _23.is_experienced = true,
                                _23.created_at = new Date("2023-01-01"),
                                _23.fullname = "陳月文",
                                _23)
                        ])])];
                case 48:
                    _24.sent();
                    return [4 /*yield*/, trx.commit()];
                case 49:
                    _24.sent();
                    return [3 /*break*/, 52];
                case 50:
                    e_1 = _24.sent();
                    console.log(e_1);
                    return [4 /*yield*/, trx.rollback()];
                case 51:
                    _24.sent();
                    return [3 /*break*/, 52];
                case 52: return [2 /*return*/];
            }
        });
    });
}
exports.seed = seed;
//# sourceMappingURL=03_TABLES.USERS.js.map