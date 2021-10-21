import mongoose from 'mongoose';

interface HistoryAttr {
    amount: number;
    withdraw: boolean;
    user: string;
}

interface HistoryModel extends mongoose.Model<HistoryDoc> {
    build(attrs: HistoryAttr): HistoryDoc;
}

interface HistoryDoc extends mongoose.Document {
    amount: number;
    withdraw: boolean;
    user: string;
}

const historySchema = new mongoose.Schema({
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.pin;
            delete ret.__v;
        }
    },
    timestamps: true,
});

historySchema.statics.build = (attrs: HistoryAttr) => {
    return new History(attrs);
}

const History = mongoose.model<HistoryDoc, HistoryModel>('History', historySchema);

export { History, HistoryDoc };