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
exports.handlePaymentIntentStatusChangeForTransferring = exports.createPaymentAccountLink = exports.createPaymentAccount = exports.createPaymentIntentWithoutPaymentMethod = void 0;
const uuid_1 = require("uuid");
const config_1 = require("../../common/config");
const errors_1 = require("../../common/errors");
const stripeService = __importStar(require("../stripe/stripe.service"));
const REFLECT_STRIPE_FEES_TO_SELLERS = (0, config_1.getValue)(config_1.ENV_VARS.REFLECT_STRIPE_FEES_TO_SELLERS);
const PAYMENT_INFRA_PROVIDER_FEE_PERCENT = (0, config_1.getNumberValue)(config_1.ENV_VARS.PAYMENT_INFRA_PROVIDER_FEE_PERCENT);
const PAYMENT_INFRA_PROVIDER_FEE_CONSTANT = (0, config_1.getNumberValue)(config_1.ENV_VARS.PAYMENT_INFRA_PROVIDER_FEE_CONSTANT);
const PLATFORM_FEE_PERCENT = REFLECT_STRIPE_FEES_TO_SELLERS == 'false'
    ? (0, config_1.getNumberValue)(config_1.ENV_VARS.PLATFORM_FEE_PERCENT) - PAYMENT_INFRA_PROVIDER_FEE_PERCENT
    : (0, config_1.getNumberValue)(config_1.ENV_VARS.PLATFORM_FEE_PERCENT);
const SELLER_SHARE_PAYMENT_INTENT_META_KEY = 'share_of';
const SELLER_SHARE_PAYMENT_INTENT_META_KEY_SEPARATOR = '.PISOS.';
const createPaymentIntentWithoutPaymentMethod = async (dto) => {
    const { productIds } = dto;
    const { data: products } = await stripeService.stripe.products.list({ ids: productIds, expand: ['data.default_price'] });
    if (products.length < 1) {
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.CannotCheckoutForNoProduct]);
    }
    const { checkoutAmount, sellersWithShares } = createTradeInfo(products);
    const { client_secret: clientSecret } = await stripeService.stripe.paymentIntents.create({
        amount: checkoutAmount,
        currency: 'gbp',
        transfer_group: (0, uuid_1.v4)(),
        metadata: Object.assign({}, Object.fromEntries(sellersWithShares)),
    });
    return {
        clientSecret,
    };
};
exports.createPaymentIntentWithoutPaymentMethod = createPaymentIntentWithoutPaymentMethod;
const createPaymentAccount = async (dto) => {
    const { email } = dto;
    const { id: paymentAccountId } = await stripeService.stripe.accounts.create({
        type: 'express',
        country: 'GB',
        email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    });
    return {
        id: paymentAccountId,
    };
};
exports.createPaymentAccount = createPaymentAccount;
const createPaymentAccountLink = async (dto) => {
    const { accountId } = dto;
    const { url: accountUrl } = await stripeService.stripe.accountLinks.create({
        account: accountId,
        refresh_url: 'https://Lookingexample.com/reauth',
        return_url: 'https://Lookingexample.com/return',
        type: 'account_onboarding',
    });
    return {
        url: accountUrl,
    };
};
exports.createPaymentAccountLink = createPaymentAccountLink;
const handlePaymentIntentStatusChangeForTransferring = async (webhookRequest) => {
    const { body: { data: { object: paymentIntent } } } = webhookRequest;
    const { status, transfer_group: transferGroup, metadata: metadataKeys, latest_charge: chargeId } = paymentIntent;
    if (status != 'succeeded' || !transferGroup)
        return;
    const transferCreationPromises = [];
    for (const metadataKey in metadataKeys) {
        if (!metadataKey.startsWith(SELLER_SHARE_PAYMENT_INTENT_META_KEY))
            continue;
        const [sellerId, amount] = [
            metadataKey.split(SELLER_SHARE_PAYMENT_INTENT_META_KEY_SEPARATOR).at(1),
            metadataKeys[metadataKey],
        ];
        const transferCreationPromise = stripeService.stripe.transfers.create({
            transfer_group: transferGroup,
            destination: sellerId,
            amount: Number(amount),
            currency: 'gbp',
            source_transaction: chargeId,
        });
        transferCreationPromises.push(transferCreationPromise);
    }
    await Promise.all(transferCreationPromises);
};
exports.handlePaymentIntentStatusChangeForTransferring = handlePaymentIntentStatusChangeForTransferring;
const createTradeInfo = (products) => {
    const tradeInfo = {
        checkoutAmount: 0,
        sellersWithShares: new Map(),
        platformFee: 0,
    };
    for (const product of products) {
        const { default_price: price, metadata: { sellerId } } = product;
        const { unit_amount: amount } = price;
        const parsedAmount = Number(amount);
        tradeInfo.checkoutAmount = tradeInfo.checkoutAmount + parsedAmount;
        setSellerShareToTradeInfo(tradeInfo, sellerId, parsedAmount);
    }
    tradeInfo['platformFee'] = calculatePlatformFee(tradeInfo['checkoutAmount']);
    return tradeInfo;
};
const setSellerShareToTradeInfo = (tradeInfo, sellerId, amount) => {
    const sellerIdForMetadata = `${SELLER_SHARE_PAYMENT_INTENT_META_KEY}${SELLER_SHARE_PAYMENT_INTENT_META_KEY_SEPARATOR}${sellerId}`;
    const currentSellerShare = tradeInfo.sellersWithShares.get(sellerIdForMetadata);
    const feelessAmount = calculateFeelessAmount(amount);
    if (currentSellerShare) {
        tradeInfo.sellersWithShares.set(sellerIdForMetadata, Math.round(currentSellerShare + feelessAmount));
        return;
    }
    tradeInfo.sellersWithShares.set(sellerIdForMetadata, feelessAmount);
};
const calculateFeelessAmount = (amount) => {
    const platformFee = calculatePlatformFee(amount);
    const paymentInfraProviderFee = calculatePaymentInfraProviderFee(amount);
    return Math.round(amount - (platformFee + paymentInfraProviderFee));
};
const calculatePlatformFee = (amount) => {
    return REFLECT_STRIPE_FEES_TO_SELLERS == 'false'
        ? Math.round(amount * (PLATFORM_FEE_PERCENT / 100)) - PAYMENT_INFRA_PROVIDER_FEE_CONSTANT
        : Math.round(amount * (PLATFORM_FEE_PERCENT / 100));
};
const calculatePaymentInfraProviderFee = (amount) => {
    return Math.round(amount * (PAYMENT_INFRA_PROVIDER_FEE_PERCENT / 100)) + PAYMENT_INFRA_PROVIDER_FEE_CONSTANT;
};
//# sourceMappingURL=payment.service.js.map