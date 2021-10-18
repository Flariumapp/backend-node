import mongoose from 'mongoose';

interface BankAttr {
    name: string;
    logo: string;
}

interface BankModel extends mongoose.Model<BankDoc> {
    build(attrs: BankAttr): BankDoc;
}

interface BankDoc extends mongoose.Document {
    name: string;
    logo: string;
}

const bankSchema = new mongoose.Schema({
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
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});

bankSchema.statics.build = (attrs: BankAttr) => {
    return new Bank(attrs);
}

const Bank = mongoose.model<BankDoc, BankModel>('Bank', bankSchema);

export { Bank };