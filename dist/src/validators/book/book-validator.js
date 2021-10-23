"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('flight')
        .notEmpty()
        .withMessage('Flight ID must be provided'),
];
exports.BookValidator = validator;
