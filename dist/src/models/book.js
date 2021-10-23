"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var class_type_1 = require("../utility/class-type");
var BookSchema = new mongoose_1.default.Schema({
    cost: {
        type: Number,
        required: true,
    },
    classType: {
        type: class_type_1.ClassType,
        required: false,
        default: class_type_1.ClassType.Economic,
    },
    passengers: [{
            type: String,
            ref: 'Passenger',
            required: false,
        }],
    flight: {
        type: String,
        ref: 'Flight',
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
            delete ret.__v;
        }
    },
    timestamps: true,
});
BookSchema.statics.build = function (attrs) {
    return new Book(attrs);
};
var Book = mongoose_1.default.model('Book', BookSchema);
exports.Book = Book;
