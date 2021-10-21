import mongoose from 'mongoose';
import { ClassType } from '../utility/class-type';

interface BookAttr {
    cost: number;
    classType: ClassType;
    passengers: string[];
    flight: string;
    user: string;
}

interface BookModel extends mongoose.Model<BookDoc> {
    build(attrs: BookAttr): BookDoc;
}

interface BookDoc extends mongoose.Document {
    cost: number;
    classType: ClassType;
    passengers: string[],
    flight: string;
    user: string;
}

const BookSchema = new mongoose.Schema({
    cost: {
        type: Number,
        required: true,
    },
    classType: {
        type: ClassType,
        required: false,
        default: ClassType.Economic,
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

BookSchema.statics.build = (attrs: BookAttr) => {
    return new Book(attrs);
}

const Book = mongoose.model<BookDoc, BookModel>('Book', BookSchema);

export { Book, BookDoc };