"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const firebase_1 = require("../../baas/firebase");
const authMiddleware = async (req, res, next) => {
    try {
        const { headers } = req;
        const token = headers['authorization'];
        checkIfTokenDefined(token);
        const jwt = getJwt(token);
        await firebase_1.firebaseAuth.verifyToken(jwt);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
const checkIfTokenDefined = (token) => {
    if (!token)
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.Unauthorized]);
};
const getJwt = (token) => {
    const splittedToken = token.split(' ');
    if (!splittedToken.at(0) || splittedToken.at(0) !== 'Bearer')
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.Unauthorized]);
    if (!splittedToken.at(1))
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.Unauthorized]);
    return splittedToken.at(1);
};
//# sourceMappingURL=auth.middleware.js.map