"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const config_1 = require("./common/config");
const config_2 = require("./common/config");
const payment_routes_1 = require("./modules/payment/payment.routes");
const product_routes_1 = require("./modules/product/product.routes");
const middlewares_1 = require("./common/middlewares");
const xss_clean_1 = __importDefault(require("xss-clean"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
(0, config_1.validateIntegrityOfEnvVars)();
const PORT = (0, config_2.getNumberValue)(config_1.ENV_VARS.PORT);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, xss_clean_1.default)());
app.use((0, helmet_1.default)());
app.use(payment_routes_1.paymentRoutes, product_routes_1.productRoutes);
app.use(middlewares_1.errorHandlerMiddleware);
app.use((0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 25,
    message: 'Too many requests within a short time. Please try again later',
}));
app.listen(PORT, () => {
    console.log(`🚀Application is running on port: ${PORT}🚀`.green);
});
//# sourceMappingURL=main.js.map