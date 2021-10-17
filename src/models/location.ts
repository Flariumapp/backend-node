import mongoose from 'mongoose';

interface LocationAttr {
    name: string;
    country: string;
    gallery: string[];
    description: string;
}

interface LocationModel extends mongoose.Model<LocationDoc> {
    build(attrs: LocationAttr): LocationDoc;
}

interface LocationDoc extends mongoose.Document {
    name: string;
    country: string;
    gallery: string[];
    description: string;
}

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    gallery: [{
        type: String,
        ref: 'Gallery',
        required: false,
    }],
    description: {
        type: String,
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

locationSchema.statics.build = (attrs: LocationAttr) => {
    return new Location(attrs);
}

const Location = mongoose.model<LocationDoc, LocationModel>('Location', locationSchema);

export { Location };