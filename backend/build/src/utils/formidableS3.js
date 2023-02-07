"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileS3Controller = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var formidable_1 = __importDefault(require("formidable"));
var stream_1 = __importDefault(require("stream"));
var process_1 = require("process");
var FileS3Controller = /** @class */ (function () {
    function FileS3Controller() {
        var _this = this;
        var _a, _b;
        this.counter = 0;
        this.upload = function (bucketPath) { return function (req, res, next) {
            var filename = "";
            var uploads = [];
            var form = new formidable_1.default.Formidable({
                fileWriteStreamHandler: function () {
                    var _a;
                    var passThroughStream = new stream_1.default.PassThrough();
                    var upload = _this.s3.upload({
                        Body: passThroughStream,
                        Bucket: "".concat((_a = process_1.env.S3_BUCKET_NAME) !== null && _a !== void 0 ? _a : "").concat(bucketPath),
                        Key: filename,
                    }, {});
                    upload.send();
                    uploads.push(upload);
                    return passThroughStream;
                },
                filename: function (name, ext, part) {
                    var field = part.name;
                    var timestamp = Date.now();
                    filename = "".concat(field, "-").concat(timestamp, "-").concat(++_this.counter);
                    return filename;
                },
            });
            form.parse(req, function (err, fields, files) {
                if (err) {
                    uploads.forEach(function (upload) { return upload.abort(); });
                    res.status(400).json({ error: "Failed to parse form data. " + String(err) });
                    return;
                }
                Promise.all(uploads.map(function (upload) { return upload.promise(); }))
                    .then(function (s3Files) {
                    // TODO pass to fileService to store the s3 keys into database
                    req.form = { fields: fields, files: files, s3Files: s3Files };
                    next();
                })
                    .catch(function (err) {
                    uploads.forEach(function (upload) { return upload.abort(); });
                    console.log(err);
                    res.status(502).json({ error: "Failed to upload to S3. " + String(err) });
                });
            });
        }; };
        var credentials = new aws_sdk_1.default.Credentials({
            accessKeyId: (_a = process_1.env.AWS_ACCESS_KEY_ID) !== null && _a !== void 0 ? _a : "",
            secretAccessKey: (_b = process_1.env.AWS_SECRET_ACCESS_KEY) !== null && _b !== void 0 ? _b : "",
        });
        this.s3 = new aws_sdk_1.default.S3({ credentials: credentials, region: process_1.env.S3_REGION });
    }
    return FileS3Controller;
}());
exports.FileS3Controller = FileS3Controller;
//# sourceMappingURL=formidableS3.js.map