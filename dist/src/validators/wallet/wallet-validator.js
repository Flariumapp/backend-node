"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('pin')
        .notEmpty()
        .withMessage('Pin must be provided!')
        .isLength({ min: 4, max: 4 })
        .withMessage('Pin must be of exactly 4 characters'),
    (0, express_validator_1.body)('amount')
        .notEmpty()
        .withMessage('Amount must be provided!')
        .isFloat({ min: 1, max: 1000 })
        .withMessage('Amount must be a number between 1 and 1000 inclusive'),
];
exports.WalletValidator = validator;
