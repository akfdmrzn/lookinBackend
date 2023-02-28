"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
var ApiError;
(function (ApiError) {
    ApiError["UndefinedError"] = "Undefined Error";
    ApiError["Unauthorized"] = "Unauthorized";
    ApiError["ChargingFailure"] = "Charging Failure";
    ApiError["BalanceExceeded"] = "Balance Exceeded";
    ApiError["TransferringFailure"] = "Transferring Failure";
    ApiError["CannotCheckoutForNoProduct"] = "Can`t Checkout For No Product";
    ApiError["BadInput"] = "Bad Input";
})(ApiError = exports.ApiError || (exports.ApiError = {}));
//# sourceMappingURL=api-error.enum.js.map