import mongoose from "mongoose"
const { Schema } = mongoose
const ExampleSchema = new Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })
export default mongoose.model('Example', ExampleSchema)