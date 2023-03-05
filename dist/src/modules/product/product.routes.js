"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const PRODUCTS_ROUTE = '/products';
exports.productRoutes = (0, express_1.Router)()
    .post(`${PRODUCTS_ROUTE}`, product_controller_1.createProduct);
//# sourceMappingURL=product.routes.js.map