import mongoose, { Schema, Document } from "mongoose";

// Define Driver schema
interface IDriver extends Document {
    isAvailable: boolean 
}

const driverSchema = new Schema<IDriver>({
    isAvailable: {
        type: Boolean,
        required: true,
        default: true           // Default value for isAvailable is true
    }
})

export default mongoose.model<IDriver>('Driver', driverSchema)