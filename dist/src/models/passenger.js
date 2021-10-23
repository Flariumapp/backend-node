"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var gender_type_1 = require("../utility/gender-type");
var meal_type_1 = require("../utility/meal-type");
var passengerSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: gender_type_1.GenderType,
        required: true,
    },
    meal: {
        type: meal_type_1.MealType,
        required: true,
        default: meal_type_1.MealType.None,
    },
    imageIndex: {
        type: Number,
        required: true,
        default: 0,
    },
    flight: {
        type: String,
        ref: 'Flight',
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
passengerSchema.statics.build = function (attrs) {
    return new Passenger(attrs);
};
var Passenger = mongoose_1.default.model('Passenger', passengerSchema);
exports.Passenger = Passenger;
