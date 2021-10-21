import mongoose from 'mongoose';

interface WalletAttr {
    amount: number;
    pin: string;
    user: string;
}

interface WalletModel extends mongoose.Model<WalletDoc> {
    build(attrs: WalletAttr): WalletDoc;
}

interface WalletDoc extends mongoose.Document {
    amount: number;
    pin: string;
    user: string;
}

const walletSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    pin: {
        type: String,
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

walletSchema.statics.build = (attrs: WalletAttr) => {
    return new Wallet(attrs);
}

const Wallet = mongoose.model<WalletDoc, WalletModel>('Wallet', walletSchema);

export { Wallet, WalletDoc };