"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWebhookSign = exports.stripe = void 0;
const stripe_1 = require("stripe");
const errors_1 = require("../../common/errors");
const config_1 = require("../../common/config");
const STRIPE_PRIVATE_KEY = (0, config_1.getValue)(config_1.ENV_VARS.STRIPE_PRIVATE_KEY);
exports.stripe = new stripe_1.Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: '2022-11-15',
    typescript: true
});
const validateWebhookSign = (webhookRequest) => {
    try {
        const rawBody = webhookRequest['rawBody'];
        const sig = webhookRequest.headers['stripe-signature'];
        if (!sig)
            throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.Unauthorized]);
        const endpointSecret = (0, config_1.getValue)(config_1.ENV_VARS.WEBHOOK_SIGNING_SECRET);
        exports.stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    }
    catch (error) {
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.FakeWebhook]);
    }
};
exports.validateWebhookSign = validateWebhookSign;
//# sourceMappingURL=stripe.service.js.map