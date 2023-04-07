import User from "../models/User"
import Role from "../models/Role"
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

const addRole = async (req: Request, res: Response) => {
    try {
        const { user_id, role_id } = req.body
        const addToUser = await User.updateOne({ _id: new ObjectId(user_id) }, { $push: { assigned_roles: new ObjectId(role_id) } })
        if (!addToUser.acknowledged) {
            return res.json({ success: false, message: "Error Adding Role" })
        }
        return res.json({ success: true, message: "Role Added Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const removeRole = async (req: Request, res: Response) => {
    try {
        const { user_id, role_id } = req.body
        const removeFromUser = await User.updateOne({ _id: new ObjectId(user_id) }, { $pull: { assigned_roles: new ObjectId(role_id) } })
        if (!removeFromUser.acknowledged) {
            return res.json({ success: false, message: "Error Removing Role" })
        }
        return res.json({ success: true, message: "Role Removed Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const addPermission = async (req: Request, res: Response) => {
    try {
        const { role_id, permission_id } = req.body
        const addToRole = await Role.updateOne({ _id: new ObjectId(role_id) }, { $push: { permissions: new ObjectId(permission_id) } })
        if (!addToRole.acknowledged) {
            return res.json({ success: false, message: "Error Adding Permission" })
        }
        return res.json({ success: true, message: "Permission Added Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const removePermission = async (req: Request, res: Response) => {
    try {
        const { role_id, permission_id } = req.body
        const addToRole = await Role.updateOne({ _id: new ObjectId(role_id) }, { $pull: { permissions: new ObjectId(permission_id) } })
        if (!addToRole.acknowledged) {
            return res.json({ success: false, message: "Error Removing Permission" })
        }
        return res.json({ success: true, message: "Permission Removed Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { addRole, removeRole, addPermission, removePermission }