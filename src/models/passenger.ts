import mongoose from 'mongoose';
import { MealType } from '../utility/meal-type';

interface PassengerAttr {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    meal: MealType;
    imageIndex: number;
    flight: string;
}

interface PassengerModel extends mongoose.Model<PassengerDoc> {
    build(attrs: PassengerAttr): PassengerDoc;
}

interface PassengerDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    meal: MealType;
    imageIndex: number;
    flight: string;
}

const passengerSchema = new mongoose.Schema({
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
        type: String,
        required: true,
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

passengerSchema.statics.build = (attrs: PassengerAttr) => {
    return new Passenger(attrs);
}

const Passenger = mongoose.model<PassengerDoc, PassengerModel>('Passenger', passengerSchema);

export { Passenger, PassengerDoc };