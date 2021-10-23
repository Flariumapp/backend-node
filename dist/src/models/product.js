"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var product_category_1 = require("../utility/product-category");
var productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: product_category_1.ProductCategory,
        required: true,
        default: product_category_1.ProductCategory.Food,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    subCategory: {
        type: String,
        required: false,
    },
    meta: {
        type: Object,
        required: false,
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
productSchema.statics.build = function (attrs) {
    return new Product(attrs);
};
var Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
