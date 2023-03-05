"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const errors_1 = require("../../../common/errors");
const firebase_app_1 = require("../firebase.app");
const verifyToken = async (jwt) => {
    try {
        await firebase_app_1.adminApp.auth().verifyIdToken(jwt);
    }
    catch (error) {
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.Unauthorized]);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.service.js.map