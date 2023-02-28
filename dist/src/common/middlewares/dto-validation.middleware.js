"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoValidationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const errors_1 = require("../errors");
const dtoValidationMiddleware = (classSign) => async (req, res, next) => {
    try {
        const { body } = req;
        const dtoInstance = (0, class_transformer_1.plainToInstance)(classSign, body);
        const validationErrors = await (0, class_validator_1.validate)(dtoInstance, {
            forbidUnknownValues: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (validationErrors.length > 0)
            throw new errors_1.DomainError(Object.assign(Object.assign({}, errors_1.API_ERRORS[errors_1.ApiError.BadInput]), { causes: validationErrors }));
    }
    catch (error) {
        next(error);
    }
};
exports.dtoValidationMiddleware = dtoValidationMiddleware;
//# sourceMappingURL=dto-validation.middleware.js.map