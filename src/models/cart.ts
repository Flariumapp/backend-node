import mongoose from 'mongoose';

interface CartAttr {
    product: string;
    quantity: number;
}

interface CartModel extends mongoose.Model<CartDoc> {
    build(attrs: CartAttr): CartDoc;
}

interface CartDoc extends mongoose.Document {
    product: string;
    quantity: number;
}

const cartSchema = new mongoose.Schema({
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

cartSchema.statics.build = (attrs: CartAttr) => {
    return new Cart(attrs);
}

const Cart = mongoose.model<CartDoc, CartModel>('Cart', cartSchema);

export { Cart, CartDoc };