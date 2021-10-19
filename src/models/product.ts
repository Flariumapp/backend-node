import mongoose from 'mongoose';
import { ClothProductCategory, FoodProductCategory, ProductCategory } from '../utility/product-category';

interface ProductAttr {
    name: string;
    category: ProductCategory;
    price: number;
    gallery: string[];
    subCategory: FoodProductCategory | ClothProductCategory;
    meta: object;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttr): ProductDoc;
}

interface ProductDoc extends mongoose.Document {
    name: string;
    category: ProductCategory;
    price: number;
    gallery: string[];
    subCategory: FoodProductCategory | ClothProductCategory;
    meta: object;
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: ProductCategory,
        required: true,
        default: ProductCategory.Food,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    subCategory: {
        type: String,
        required: false,
    },
    meta: {
        type: Object,
        required: false,
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

productSchema.statics.build = (attrs: ProductAttr) => {
    return new Product(attrs);
}

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export { Product, ProductDoc };