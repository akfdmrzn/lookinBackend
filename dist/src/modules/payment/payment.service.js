"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentIntentStatusChangeForTransferring = exports.createPaymentAccountLink = exports.createProduct = exports.createPaymentAccount = exports.createPaymentIntentWithoutPaymentMethod = void 0;
const stripe_1 = require("stripe");
const uuid_1 = require("uuid");
const config_1 = require("../../common/config");
const errors_1 = require("../../common/errors");
const STRIPE_PRIVATE_KEY = (0, config_1.getValue)(config_1.ENV_VARS.STRIPE_PRIVATE_KEY);
const SELLER_SHARE_PAYMENT_INTENT_META_KEY = 'share_of';
const SELLER_SHARE_PAYMENT_INTENT_META_KEY_SEPARATOR = ':<<>>:';
const stripe = new stripe_1.Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: '2022-11-15',
    typescript: true
});
const createPaymentIntentWithoutPaymentMethod = async (dto) => {
    const { productIds } = dto;
    const { data: products } = await stripe.products.list({ ids: productIds, expand: ['data.default_price'] });
    if (products.length < 1) {
        throw new errors_1.DomainError(errors_1.API_ERRORS[errors_1.ApiError.CannotCheckoutForNoProduct]);
    }
    const { checkoutAmount, sellersWithShares } = createTradeInfo(products);
    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
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
    const { id: paymentAccountId } = await stripe.accounts.create({
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
const createProduct = async (dto) => {
    const { name, price, currency, sellerId } = dto;
    const { id: productId } = await stripe.products.create({
        name,
        default_price_data: {
            currency,
            unit_amount: price,
        },
        metadata: {
            sellerId,
        }
    });
    return {
        id: productId,
    };
};
exports.createProduct = createProduct;
const createPaymentAccountLink = async (dto) => {
    const { accountId } = dto;
    const { url: accountUrl } = await stripe.accountLinks.create({
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
    const { status, transfer_group: transferGroup, metadata: metadataKeys } = paymentIntent;
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
        const transferCreationPromise = stripe.transfers.create({
            transfer_group: transferGroup,
            destination: sellerId,
            amount: Number(amount),
            currency: 'gbp',
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
    };
    for (const product of products) {
        const { default_price: price, metadata: { sellerId } } = product;
        const { unit_amount: amount } = price;
        const parsedAmount = Number(amount);
        tradeInfo.checkoutAmount = tradeInfo.checkoutAmount + parsedAmount;
        setSellerShareToTradeInfo(tradeInfo, sellerId, parsedAmount);
    }
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
    return Math.round(amount - platformFee);
};
const calculatePlatformFee = (amount) => {
    const platformFeePercent = (0, config_1.getNumberValue)(config_1.ENV_VARS.PLATFORM_FEE_PERCENT);
    return Math.round(amount * (platformFeePercent / 100));
};
//# sourceMappingURL=payment.service.js.map