"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhooks = exports.createPaymentAccount = exports.createPaymentAccountLink = exports.createProduct = exports.createPaymentIntent = void 0;
const http_status_codes_1 = require("http-status-codes");
const paymentService = __importStar(require("./payment.service"));
const paymentWebhookHandler = __importStar(require("./payment.webhook-handler"));
const createPaymentIntent = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await paymentService.createPaymentIntentWithoutPaymentMethod(body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentIntent = createPaymentIntent;
const createProduct = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await paymentService.createProduct(body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const createPaymentAccountLink = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await paymentService.createPaymentAccountLink(body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentAccountLink = createPaymentAccountLink;
const createPaymentAccount = async (req, res, next) => {
    try {
        const { body } = req;
        const result = await paymentService.createPaymentAccount(body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentAccount = createPaymentAccount;
const handleStripeWebhooks = async (req, res, next) => {
    try {
        paymentWebhookHandler.stripeWebhookExecutorWrapper(req);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'success' });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.handleStripeWebhooks = handleStripeWebhooks;
//# sourceMappingURL=payment.controller.js.map