import Permission from "../models/Permission"
import Role from "../models/Role"
import Resource from "../models/Resource"
import { ObjectId } from "mongodb"
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

const getPermissionById = async (req: Request, res: Response) => {
    try {
        const permission = await Permission.findOne({_id: req.params.id})
        return res.json({ success: true, message: "Permissions Found Successfully", data: permission })
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

const deletePermission = async (req: Request, res: Response) => {
    try {
        const permission_id = new ObjectId(req.params.id)
        const updateRoles = await Role.updateMany({}, { $pull: { permissions: permission_id } })
        if (!updateRoles.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Permission" })
        }
        const updateResources = await Resource.updateMany({}, { $pull: { permissions: permission_id } })
        if (!updateResources.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Permission" })
        }
        const deletePermissionFromDB = await Permission.deleteOne({ _id: permission_id })
        if (!deletePermissionFromDB.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Permission" })
        }
        return res.json({ success: true, message: "Permission Deleted Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { getAllPermissions, getPermissionById, createPermission, updatePermission, deletePermission }