import mongoose from 'mongoose';

interface FlightAttr {
    flightNo: number;
    brand: string;
    origin: string;
    destination: string;
    arrival: string;
    departure: string;
    gateNo: string;
    terminal: string;
    status: string;
    baseFare: number;
}

interface FlightModel extends mongoose.Model<FlightDoc> {
    build(attrs: FlightAttr): FlightDoc;
}

interface FlightDoc extends mongoose.Document {
    flightNo: number;
    brand: string;
    origin: string;
    destination: string;
    arrival: string;
    departure: string;
    gateNo: string;
    terminal: string;
    status: string;
    baseFare: number;
}

const flightSchema = new mongoose.Schema({
    flightNo: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        ref: 'Company',
        required: true,
    },
    origin: {
        type: String,
        ref: 'Location',
        required: true,
    },
    destination: {
        type: String,
        ref: 'Location',
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    departure: {
        type: String,
        required: true,
    },
    gateNo: {
        type: String,
        required: true,
    },
    terminal: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    baseFare: {
        type: Number,
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

flightSchema.statics.build = (attrs: FlightAttr) => {
    return new Flight(attrs);
}

const Flight = mongoose.model<FlightDoc, FlightModel>('Flight', flightSchema);

export { Flight };