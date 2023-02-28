"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const PAYMENTS_ROUTE = '/payments';
exports.paymentRoutes = (0, express_1.Router)()
    .post(`${PAYMENTS_ROUTE}/payment-intent`, payment_controller_1.createPaymentIntent)
    .post(`${PAYMENTS_ROUTE}/stripe-webhooks`, payment_controller_1.handleStripeWebhooks)
    .post(`${PAYMENTS_ROUTE}/account`, payment_controller_1.createPaymentAccount)
    .post(`${PAYMENTS_ROUTE}/account-link`, payment_controller_1.createPaymentAccountLink)
    .post(`${PAYMENTS_ROUTE}/product`, payment_controller_1.createProduct);
//# sourceMappingURL=payment.routes.js.map