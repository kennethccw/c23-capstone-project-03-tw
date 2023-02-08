"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.AdoptionResultFailReason = exports.AdoptionResultStatus = exports.PetGender = exports.LoginRole = exports.BadgeImage = exports.BadgeRank = exports.BadgeType = exports.District = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
    Gender[Gender["others"] = 2] = "others";
})(Gender = exports.Gender || (exports.Gender = {}));
var District;
(function (District) {
    District["kowloon"] = "kowloon";
    District["hong_kong_island"] = "hong_kong_island";
    District["new_territories"] = "new_territories";
})(District = exports.District || (exports.District = {}));
var BadgeType;
(function (BadgeType) {
    BadgeType[BadgeType["warmhearted"] = 1] = "warmhearted";
    BadgeType[BadgeType["advertising_philanthropist"] = 2] = "advertising_philanthropist";
    BadgeType[BadgeType["donation_philanthropist"] = 3] = "donation_philanthropist";
})(BadgeType = exports.BadgeType || (exports.BadgeType = {}));
var BadgeRank;
(function (BadgeRank) {
    BadgeRank["gold"] = "gold";
    BadgeRank["silver"] = "silver";
    BadgeRank["copper"] = "copper";
})(BadgeRank = exports.BadgeRank || (exports.BadgeRank = {}));
var BadgeImage;
(function (BadgeImage) {
    BadgeImage["gold"] = "goldbadge.png";
    BadgeImage["silver"] = "silverbadge.png";
    BadgeImage["copper"] = "cropperbadge.png";
})(BadgeImage = exports.BadgeImage || (exports.BadgeImage = {}));
var LoginRole;
(function (LoginRole) {
    LoginRole["organisation"] = "organisation";
    LoginRole["user"] = "user";
})(LoginRole = exports.LoginRole || (exports.LoginRole = {}));
var PetGender;
(function (PetGender) {
    PetGender["male"] = "male";
    PetGender["female"] = "female";
})(PetGender = exports.PetGender || (exports.PetGender = {}));
var AdoptionResultStatus;
(function (AdoptionResultStatus) {
    AdoptionResultStatus["pending"] = "pending";
    AdoptionResultStatus["success"] = "success";
    AdoptionResultStatus["fail"] = "fail";
    AdoptionResultStatus["cancelled"] = "cancelled";
})(AdoptionResultStatus = exports.AdoptionResultStatus || (exports.AdoptionResultStatus = {}));
var AdoptionResultFailReason;
(function (AdoptionResultFailReason) {
    AdoptionResultFailReason["not_applicable"] = "not_applicable";
    AdoptionResultFailReason["age_under_21"] = "age_under_21";
    AdoptionResultFailReason["no_window_screen"] = "no_window_screen";
    AdoptionResultFailReason["other"] = "other";
})(AdoptionResultFailReason = exports.AdoptionResultFailReason || (exports.AdoptionResultFailReason = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["badge"] = "badge";
    NotificationType["message"] = "message";
    NotificationType["activity"] = "activity";
    NotificationType["adoption"] = "adoption";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
//# sourceMappingURL=models.js.map