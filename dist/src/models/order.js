"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.default.Schema({
    carts: [{
            type: String,
            ref: 'Cart',
            required: true,
        }],
    price: {
        type: Number,
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
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});
orderSchema.statics.build = function (attrs) {
    return new Order(attrs);
};
var Order = mongoose_1.default.model('Order', orderSchema);
exports.Order = Order;
