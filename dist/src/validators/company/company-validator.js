"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .isLength({ min: 2 })
        .withMessage('Company name must be present (atleast 2 characters)'),
    (0, express_validator_1.body)('logo')
        .notEmpty()
        .withMessage('Logo must be provided for a company'),
];
exports.CompanyValidator = validator;
