"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
class DomainError extends Error {
    constructor(error) {
        const { message, statusCode, causes } = error;
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.causes = causes;
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=domain.error.js.map