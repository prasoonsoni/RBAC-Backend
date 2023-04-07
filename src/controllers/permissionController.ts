import { ObjectId } from "mongodb"
import Permission from "../models/Permission"
import { Request, Response } from "express"

const getAllPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await Permission.find({})
        return res.json({ success: true, message: "Permissions Found Successfully", data: permissions })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const createPermission = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body
        const permission = await Permission.create({ name, description })
        if (!permission) {
            return res.json({ success: false, message: "Error Creating Permission" })
        }
        return res.json({ success: true, message: "Permission Created Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const updatePermission = async (req: Request, res: Response) => {
    try {
        const permission_id = new ObjectId(req.params.id)
        const { name, description } = req.body
        const update = await Permission.updateOne({ _id: permission_id }, { $set: { name, description } })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error Updating Permission" })
        }
        return res.json({ success: true, message: "Permission Updated Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { getAllPermissions, createPermission, updatePermission }