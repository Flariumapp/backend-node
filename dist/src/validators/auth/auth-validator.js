"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Invalid email address'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];
exports.AuthValidator = validator;
