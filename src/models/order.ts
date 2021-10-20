import mongoose from 'mongoose';

interface OrderAttr {
    carts: string[];
    price: number;
    user: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttr): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
    carts: string[];
    price: number;
    user: string;
}

const orderSchema = new mongoose.Schema({
    carts: [{
        type: String,
        ref: 'Cart',
        required: true,
    }],
    price: {
        type: Number,
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
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true,
});

orderSchema.statics.build = (attrs: OrderAttr) => {
    return new Order(attrs);
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order, OrderDoc };