import mongoose, { Schema, Document } from "mongoose";

// Define Sender schema
interface ISender extends Document {
    name: string;
    email: string;
}

const senderSchema = new Schema<ISender>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model<ISender>('Sender', senderSchema)