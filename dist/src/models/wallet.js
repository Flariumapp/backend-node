"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var walletSchema = new mongoose_1.default.Schema({
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    pin: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.pin;
            delete ret.__v;
        }
    },
    timestamps: true,
});
walletSchema.statics.build = function (attrs) {
    return new Wallet(attrs);
};
var Wallet = mongoose_1.default.model('Wallet', walletSchema);
exports.Wallet = Wallet;
