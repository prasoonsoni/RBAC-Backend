import Resource from "../models/Resource"
import { Request, Response } from "express"

const getAllResources = async (req: Request, res: Response) => {
    try {
        const resources = await Resource.find({})
        return res.json({ success: true, message: "Resources found successfully", data: resources })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const createResource = async (req: Request, res: Response) => {
    try {
        const { name, description, permission } = req.body
        const resource = await Resource.create({ name, description, permission })
        if (!resource) {
            return res.json({ success: false, message: "Error Creating Resource" })
        }
        return res.json({ success: true, message: "Resource Added Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { getAllResources, createResource }