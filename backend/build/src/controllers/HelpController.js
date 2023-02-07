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
exports.HelpController = void 0;
var main_1 = require("../../main");
var HelpController = /** @class */ (function () {
    function HelpController(helpService) {
        var _this = this;
        this.helpService = helpService;
        this.getChatroom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, organisationId, userId, result, e_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        organisationId = parseInt(req.query.oid);
                        userId = parseInt(req.query.uid);
                        result = void 0;
                        console.log(organisationId);
                        if (!organisationId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.helpService.getOrganisationChatroom(id, organisationId)];
                    case 1:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!userId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.helpService.getUserChatroom(id, userId)];
                    case 3:
                        result = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).json({ message: "Internal Server Error" });
                        return [2 /*return*/];
                    case 5:
                        console.log(result);
                        res.status(200).json(result);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getSupportPanel = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var organisationId, result, e_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        organisationId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        return [4 /*yield*/, this.helpService.getSupportPanel(organisationId)];
                    case 1:
                        result = _b.sent();
                        res.status(200).json(result);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postClientTextChatroom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid_1, organisationId_1, conversation_1, result_1, e_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        uid_1 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        organisationId_1 = req.body.oid;
                        conversation_1 = req.body.conversation;
                        return [4 /*yield*/, this.helpService.postClientTextChatroom(uid_1, organisationId_1, conversation_1)];
                    case 1:
                        result_1 = _b.sent();
                        setTimeout(function () {
                            main_1.io.emit("clientId".concat(uid_1, "-to-supportId").concat(organisationId_1), { conversation: conversation_1 });
                            main_1.io.emit("to-supportId".concat(organisationId_1), {
                                conversation: conversation_1,
                                user: { id: uid_1, username: result_1.user.username },
                            });
                        }, 10);
                        res.status(200).json(result_1);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postClientImageChatroom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var uid_2, organisationId_2, image_1, result_2, e_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        uid_2 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        organisationId_2 = parseInt(req.form.fields.id);
                        image_1 = (_b = req.form.files["chatroomImage"]) === null || _b === void 0 ? void 0 : _b.newFilename;
                        console.log(image_1);
                        return [4 /*yield*/, this.helpService.postClientImageChatroom(uid_2, organisationId_2, image_1)];
                    case 1:
                        result_2 = _c.sent();
                        setTimeout(function () {
                            main_1.io.emit("clientId".concat(uid_2, "-to-supportId").concat(organisationId_2), { image: image_1 });
                            main_1.io.emit("to-supportId".concat(organisationId_2), {
                                image: image_1,
                                user: { id: uid_2, username: result_2.user.username },
                            });
                        }, 100);
                        console.log(result_2);
                        res.status(200).json(result_2);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _c.sent();
                        console.log(e_4);
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.postSupportTextChatroom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var organisationId_3, uid_3, conversation_2, result_3, e_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        organisationId_3 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        uid_3 = req.body.uid;
                        conversation_2 = req.body.conversation;
                        return [4 /*yield*/, this.helpService.postSupportTextChatroom(uid_3, organisationId_3, conversation_2)];
                    case 1:
                        result_3 = _b.sent();
                        setTimeout(function () {
                            main_1.io.emit("supportId".concat(organisationId_3, "-to-clientId").concat(uid_3), { conversation: conversation_2 });
                            main_1.io.emit("to-clientId".concat(uid_3), {
                                conversation: conversation_2,
                                organisation: { id: organisationId_3, name: result_3.organisation.name },
                            });
                        }, 10);
                        return [4 /*yield*/, this.helpService.notification(uid_3, result_3.organisation.name, organisationId_3)];
                    case 2:
                        _b.sent();
                        res.status(200).json(result_3);
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _b.sent();
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.postSupportImageChatroom = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var organisationId_4, uid_4, image_2, result_4, e_6;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        organisationId_4 = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                        uid_4 = parseInt(req.form.fields.id);
                        image_2 = (_b = req.form.files["chatroomImage"]) === null || _b === void 0 ? void 0 : _b.newFilename;
                        return [4 /*yield*/, this.helpService.postSupportImageChatroom(uid_4, organisationId_4, image_2)];
                    case 1:
                        result_4 = _c.sent();
                        setTimeout(function () {
                            main_1.io.emit("supportId".concat(organisationId_4, "-to-clientId").concat(uid_4), { image: image_2 });
                            main_1.io.emit("to-clientId".concat(uid_4), {
                                image: image_2,
                                organisation: { id: organisationId_4, name: result_4.organisation.name },
                            });
                        }, 100);
                        return [4 /*yield*/, this.helpService.notification(uid_4, result_4.organisation.name, organisationId_4)];
                    case 2:
                        _c.sent();
                        console.log(result_4);
                        res.status(200).json(result_4);
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _c.sent();
                        console.log(e_6);
                        res.status(400).json({ message: "Internal Server Error" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return HelpController;
}());
exports.HelpController = HelpController;
//# sourceMappingURL=HelpController.js.map