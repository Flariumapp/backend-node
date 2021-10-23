"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('product')
        .notEmpty()
        .withMessage('Product must be provided!'),
    (0, express_validator_1.body)('quantity')
        .notEmpty()
        .withMessage('Quantity must be provided!')
        .isNumeric()
        .withMessage('Quantity must be a number.'),
];
exports.CartValidator = validator;
