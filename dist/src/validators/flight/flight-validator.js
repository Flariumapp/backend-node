"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('flightNo')
        .isAlphanumeric()
        .withMessage('flightNo must be alpha-numeric')
        .isLength({ max: 5, min: 5 })
        .withMessage('flightNo length must be 5')
        .isUppercase()
        .withMessage('flightNo must have all characters in uppercase'),
];
exports.FlightValidator = validator;
