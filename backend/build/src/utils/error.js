"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.InvalidLoginError = exports.InternalServerError = exports.ApplicationError = void 0;
var ApplicationError = /** @class */ (function (_super) {
    __extends(ApplicationError, _super);
    function ApplicationError(message, httpStatus) {
        var _this = _super.call(this, message) || this;
        _this.httpStatus = httpStatus;
        Object.setPrototypeOf(_this, ApplicationError.prototype);
        return _this;
    }
    return ApplicationError;
}(Error));
exports.ApplicationError = ApplicationError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        var _this = _super.call(this, "internal server error", 500) || this;
        Object.setPrototypeOf(_this, ApplicationError.prototype);
        return _this;
    }
    return InternalServerError;
}(ApplicationError));
exports.InternalServerError = InternalServerError;
var InvalidLoginError = /** @class */ (function (_super) {
    __extends(InvalidLoginError, _super);
    function InvalidLoginError() {
        var _this = _super.call(this, "invalid username or password", 400) || this;
        Object.setPrototypeOf(_this, ApplicationError.prototype);
        return _this;
    }
    return InvalidLoginError;
}(ApplicationError));
exports.InvalidLoginError = InvalidLoginError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        var _this = _super.call(this, "Unauthorized", 401) || this;
        Object.setPrototypeOf(_this, ApplicationError.prototype);
        return _this;
    }
    return UnauthorizedError;
}(ApplicationError));
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=error.js.map