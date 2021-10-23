"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var express_validator_1 = require("express-validator");
var validateRequest = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        var error = errors.array()[0];
        throw new Error(error.msg);
    }
    next();
};
exports.validateRequest = validateRequest;
