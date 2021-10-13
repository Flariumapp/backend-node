import mongoose from 'mongoose';

interface CompanyAttr {
    name: string;
    logo: string;
}

interface CompanyModel extends mongoose.Model<CompanyDoc> {
    build(attrs: CompanyAttr): CompanyDoc;
}

interface CompanyDoc extends mongoose.Document {
    name: string;
    logo: string;
}

const companySchema = new mongoose.Schema({
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

companySchema.statics.build = (attrs: CompanyAttr) => {
    return new Company(attrs);
}

const Company = mongoose.model<CompanyDoc, CompanyModel>('Company', companySchema);

export { Company };