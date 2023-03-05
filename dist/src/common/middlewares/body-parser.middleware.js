"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParserMiddleware = void 0;
const bodyParserMiddleware = (request, response, buffer) => {
    const url = request.originalUrl;
    if (url.startsWith('/payments/stripe-webhooks')) {
        const buff = buffer.toString();
        request['rawBody'] = buffer.toString();
    }
};
exports.bodyParserMiddleware = bodyParserMiddleware;
//# sourceMappingURL=body-parser.middleware.js.map