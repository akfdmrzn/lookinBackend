"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ERRORS = void 0;
const api_error_enum_1 = require("./api-error.enum");
const http_status_codes_1 = require("http-status-codes");
exports.API_ERRORS = {
    [api_error_enum_1.ApiError.UndefinedError]: {
        message: 'Unknown error occurred ! Please get contact with us.',
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
    },
    [api_error_enum_1.ApiError.Unauthorized]: {
        message: 'You`re not authenticated in order to execute this operation. Please try again after logged in.',
        statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
    },
    [api_error_enum_1.ApiError.ChargingFailure]: {
        message: 'Payment can not be charged. Please try again with another payment method.',
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
    },
    [api_error_enum_1.ApiError.BalanceExceeded]: {
        message: 'You do not have sufficient balance in your pocket',
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
    },
    [api_error_enum_1.ApiError.CannotCheckoutForNoProduct]: {
        message: 'You should add at least one good in your basket. No good no checkout',
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
    },
    [api_error_enum_1.ApiError.BadInput]: {
        message: 'Unprocessable entry',
        statusCode: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
    },
    [api_error_enum_1.ApiError.FakeWebhook]: {
        message: 'FakeWebhook',
        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
    }
};
//# sourceMappingURL=api.errors.const.js.map