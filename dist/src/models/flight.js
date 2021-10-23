"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var flightSchema = new mongoose_1.default.Schema({
    flightNo: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        ref: 'Company',
        required: true,
    },
    origin: {
        type: String,
        ref: 'Location',
        required: true,
    },
    destination: {
        type: String,
        ref: 'Location',
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    gateNo: {
        type: String,
        required: true,
    },
    terminal: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    baseFare: {
        type: Number,
        required: true,
    }
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
flightSchema.statics.build = function (attrs) {
    return new Flight(attrs);
};
var Flight = mongoose_1.default.model('Flight', flightSchema);
exports.Flight = Flight;
