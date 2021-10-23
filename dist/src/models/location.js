"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var locationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    gallery: [{
            type: String,
            ref: 'Gallery',
            required: false,
        }],
    description: {
        type: String,
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
locationSchema.statics.build = function (attrs) {
    return new Location(attrs);
};
var Location = mongoose_1.default.model('Location', locationSchema);
exports.Location = Location;
