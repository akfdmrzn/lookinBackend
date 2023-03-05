"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const stripe_service_1 = require("../stripe/stripe.service");
const createProduct = async (dto) => {
    const { name, price, currency, sellerId } = dto;
    const { id: productId } = await stripe_service_1.stripe.products.create({
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
//# sourceMappingURL=product.service.js.map