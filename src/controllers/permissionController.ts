import Permission from "../models/Permission"
import { Request, Response } from "express"
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

export default { createPermission }