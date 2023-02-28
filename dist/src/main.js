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
const middlewares_1 = require("./common/middlewares");
(0, config_1.validateIntegrityOfEnvVars)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = (0, config_2.getNumberValue)(config_1.ENV_VARS.PORT);
app.use(payment_routes_1.paymentRoutes);
app.use(middlewares_1.errorHandlerMiddleware);
app.listen(PORT, () => {
    console.log(`🚀Application is running on port: ${PORT}🚀`.green);
});
//# sourceMappingURL=main.js.map