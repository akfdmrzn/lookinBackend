"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_module_1 = require("../../common/io/product-module");
const middlewares_1 = require("../../common/middlewares");
const product_controller_1 = require("./product.controller");
const PRODUCTS_ROUTE = '/products';
exports.productRoutes = (0, express_1.Router)()
    .post(`${PRODUCTS_ROUTE}`, middlewares_1.authMiddleware, (0, middlewares_1.dtoValidationMiddleware)(product_module_1.ProductCreateDto), product_controller_1.createProduct);
//# sourceMappingURL=product.routes.js.map