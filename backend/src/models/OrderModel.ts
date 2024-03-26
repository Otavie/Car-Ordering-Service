import mongoose, { Schema, Document } from "mongoose";

// Define Order schema
interface IOrder extends Document {
    status: 'accepted' | 'rejected' | 'pending';
    location: string;
    destination: string;
    price: number;
    senderId: string;
    driverId?: string
}

const orderSchema = new Schema<IOrder>({
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    },
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    driverId: {
        type: String
    }
})

export default mongoose.model<IOrder>('Order', orderSchema)