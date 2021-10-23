"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
;
var currentUser = function (req, res, next) {
    // let token = null;
    // if (req.session) {
    //     console.log('session', req.session);
    // }
    // if (req.headers && req.headers.cookie) {
    //     token = req.headers.cookie.split('; ')[2].replace('next-auth.session-token=', '');
    //     console.log(token);
    // }
    // console.log('cookies', req.cookies);
    // console.log('signed cookies', req.signedCookies);
    // if (!req.session?.jwt) {
    //     return next();
    // }
    try {
        var authHeader = req.get('Authorization');
        if (!authHeader) {
            return next();
        }
        var token = authHeader.split(' ')[1];
        var decodedToken = jsonwebtoken_1.default.verify(token, 'secret');
        if (!decodedToken) {
            return next();
        }
        // const opPayload = jwt.verify(token, 'secret') as OpTokenPayload;
        // console.log('opPayload', opPayload);
        // const payload = jwt.verify(decodedToken, 'secret') as UserPayload;
        req.currentUser = decodedToken;
    }
    catch (err) {
        console.log('token error', err);
    }
    next();
};
exports.currentUser = currentUser;
