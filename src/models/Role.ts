import mongoose from "mongoose"
const { Schema } = mongoose

const RoleSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [mongoose.Types.Array], default: [] }
})

export default mongoose.model("Role", RoleSchema)