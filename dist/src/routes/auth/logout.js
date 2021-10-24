"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutRouter = void 0;
var express_1 = __importDefault(require("express"));
var Router = express_1.default.Router();
exports.LogoutRouter = Router;
Router.post('/api/auth/logout', function (req, res, next) {
    // req.session = null;
    res.send({
        message: 'User logged out successfully',
    });
});
