import { ObjectId } from "mongodb"
import Role from "../models/Role"
import { Request, Response } from "express"
import User from "../models/User"

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find({})
        return res.json({ success: true, message: "Message Roles Found Successfully", data: roles })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}


const getRole = async (req: any, res: Response) => {
    try {
        const role = await Role.findOne({ _id: new ObjectId(req.params.id) })
        if (!role) {
            return res.json({ success: false, message: 'Role Not Found.' })
        }
        return res.json({ success: true, message: 'Role Found Successfully.', role })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const createRole = async (req: Request, res: Response) => {
    try {
        const { name, description, permissions } = req.body
        const role = await Role.create({ name, description, permissions })
        if (!role) {
            return res.json({ success: false, message: "Error Creating Role" })
        }
        return res.json({ success: true, message: "Role Created Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const updateRole = async (req: Request, res: Response) => {
    try {
        const { name, description, permissions } = req.body
        const role_id = req.params.id
        const updateRole = await Role.updateOne({ _id: new ObjectId(role_id) }, { $set: { name, description, permissions } })
        if (!updateRole.acknowledged) {
            return res.json({ success: false, message: "Error Updating Role" })
        }
        return res.json({ success: true, message: "Role Updated Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const deleteRole = async (req: Request, res: Response) => {
    try {
        const role_id = new ObjectId(req.params.id)
        const updateUsers = await User.updateMany({}, { $pull: { assigned_roles: role_id } })
        if (!updateUsers.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Role" })
        }
        const deleteRoleFromDB = await Role.deleteOne({ _id: role_id })
        if (!deleteRoleFromDB.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Role" })
        }
        return res.json({ success: true, message: "Role Deleted Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { getRole, getAllRoles, createRole, updateRole, deleteRole }