import mongoose from "mongoose"
const { Schema } = mongoose

const ResourceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [mongoose.Types.ObjectId], default: [] }
})

export default mongoose.model("Resource", ResourceSchema)