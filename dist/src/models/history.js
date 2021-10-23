"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var historySchema = new mongoose_1.default.Schema({
    amount: {
        type: String,
        required: true,
        default: 0,
    },
    withdraw: {
        type: Boolean,
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
historySchema.statics.build = function (attrs) {
    return new History(attrs);
};
var History = mongoose_1.default.model('History', historySchema);
exports.History = History;
