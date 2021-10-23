"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Location name should not be empty'),
    (0, express_validator_1.body)('country')
        .notEmpty()
        .withMessage('Location country must be provided'),
];
exports.LocationValidator = validator;
