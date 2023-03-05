"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = require("stripe");
const config_1 = require("../../common/config");
const STRIPE_PRIVATE_KEY = (0, config_1.getValue)(config_1.ENV_VARS.STRIPE_PRIVATE_KEY);
exports.stripe = new stripe_1.Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: '2022-11-15',
    typescript: true
});
//# sourceMappingURL=stripe.service.js.map