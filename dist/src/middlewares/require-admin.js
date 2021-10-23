"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
var requireAdmin = function (req, res, next) {
    var _a;
    if (!((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.isAdmin)) {
        throw new Error("Not Admin!");
    }
    next();
};
exports.requireAdmin = requireAdmin;
