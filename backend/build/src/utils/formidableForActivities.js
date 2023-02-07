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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddlewareForActivities = void 0;
var fs_1 = __importDefault(require("fs"));
var formidable_1 = __importDefault(require("formidable"));
var path_1 = __importDefault(require("path"));
// declare global {
//   namespace Express {
//     interface Request {
//       form: {
//         fields: formidable.Fields;
//         files: formidable.Files;
//       };
//     }
//   }
// }
// create folder if does not exists
// const uploadDir = path.join(
//   __dirname,
//   "..",
//   "..",
//   "..",
//   "frontend",
//   "public",
//   "photos",
//   "activities"
// );
var uploadDir = path_1.default.join(__dirname, "..", "..", "uploads", "activities");
// const uploadDir = path.join(__dirname);
fs_1.default.mkdirSync(uploadDir, { recursive: true });
var fileCounter = 0;
var form = (0, formidable_1.default)({
    uploadDir: uploadDir,
    maxFiles: 1,
    maxFileSize: 200 * Math.pow(1024, 2),
    // filter: (part) => part.mimetype?.startsWith("image/") || false,
    filename: function (originalName, originalExt, part, form) {
        var _a;
        fileCounter++;
        var fieldName = part.name;
        var timestamp = Date.now();
        var ext = (_a = part.mimetype) === null || _a === void 0 ? void 0 : _a.split("/").pop();
        return "".concat(fieldName, "-").concat(timestamp, "-").concat(fileCounter, ".").concat(ext);
    },
});
var uploadMiddlewareForActivities = function (req, res, next) {
    // console.log("uploadDir", uploadDir , 'formaidable.ts L38');
    form.parse(req, function (err, fields, files) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (err) {
                console.log(err, "formidable.ts L41");
                res.status(400).json({ message: "cannot upload file" });
                return [2 /*return*/];
            }
            // console.log(req, 'formidable.ts L44')
            req.form = { fields: fields, files: files };
            // console.log(req.form.fields, 'succeed in formidable.ts L45')
            // console.log(req.form, ", req form", 'succeed in formidable.ts L46');
            // console.log(req.form.fields.audio[0], ', req form fields')
            // console.log(req.form.files, ", req form files", "succeed in formidable.ts L48");
            next();
            return [2 /*return*/];
        });
    }); });
};
exports.uploadMiddlewareForActivities = uploadMiddlewareForActivities;
//# sourceMappingURL=formidableForActivities.js.map