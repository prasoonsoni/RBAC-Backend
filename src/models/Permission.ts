import mongoose from "mongoose"
const { Schema } = mongoose

const PermissionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
})

export default mongoose.model("Permission", PermissionSchema)