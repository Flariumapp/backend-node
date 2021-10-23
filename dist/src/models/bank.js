"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var bankSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        ref: 'Gallery',
        required: false,
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});
bankSchema.statics.build = function (attrs) {
    return new Bank(attrs);
};
var Bank = mongoose_1.default.model('Bank', bankSchema);
exports.Bank = Bank;
