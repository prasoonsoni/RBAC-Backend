import Role from "../models/Role"
import { Request, Response } from "express"

const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find({})
        return res.json({ success: true, message: "Message Roles Found Successfully", data: roles })
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



export default { getAllRoles, createRole }