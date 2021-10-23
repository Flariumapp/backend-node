"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var cartSchema = new mongoose_1.default.Schema({
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});
cartSchema.statics.build = function (attrs) {
    return new Cart(attrs);
};
var Cart = mongoose_1.default.model('Cart', cartSchema);
exports.Cart = Cart;
