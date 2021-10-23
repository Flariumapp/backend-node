"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Product Name must be provided!'),
    (0, express_validator_1.body)('category')
        .notEmpty()
        .withMessage('Product category must be provided!'),
    (0, express_validator_1.body)('price')
        .notEmpty()
        .withMessage('Price must be provided!')
        .isNumeric()
        .withMessage('Price must be a number.'),
];
exports.ProductValidator = validator;
