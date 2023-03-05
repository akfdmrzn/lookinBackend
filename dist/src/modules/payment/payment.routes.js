"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const middlewares_1 = require("../../common/middlewares");
const payment_module_1 = require("../../common/io/payment-module");
const PAYMENTS_ROUTE = '/payments';
exports.paymentRoutes = (0, express_1.Router)()
    .post(`${PAYMENTS_ROUTE}/payment-intent`, middlewares_1.authMiddleware, (0, middlewares_1.dtoValidationMiddleware)(payment_module_1.PaymentIntentDto), payment_controller_1.createPaymentIntent)
    .post(`${PAYMENTS_ROUTE}/account`, middlewares_1.authMiddleware, (0, middlewares_1.dtoValidationMiddleware)(payment_module_1.PaymentAccountDto), payment_controller_1.createPaymentAccount)
    .post(`${PAYMENTS_ROUTE}/account-link`, middlewares_1.authMiddleware, (0, middlewares_1.dtoValidationMiddleware)(payment_module_1.PaymentAccountLinkCreateDto), payment_controller_1.createPaymentAccountLink)
    .post(`${PAYMENTS_ROUTE}/stripe-webhooks`, payment_controller_1.handleStripeWebhooks);
//# sourceMappingURL=payment.routes.js.map