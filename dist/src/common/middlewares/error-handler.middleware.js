"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const errorHandlerMiddleware = (error, req, res, next) => {
    console.error(`${error}`.red);
    if (error instanceof errors_1.DomainError) {
        const { statusCode, message, causes } = error;
        res.status(statusCode).json({
            message,
            causes,
        });
        return next();
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Undefined issue occurred. Our team notified about it. Stay calm and try again later.'
    });
    return next();
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
//# sourceMappingURL=error-handler.middleware.js.map