import { ObjectId } from "mongodb"
import Resource from "../models/Resource"
import User from '../models/User'
import { Request, Response } from "express"
import Role from "../models/Role"

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

const updateResource = async (req: Request, res: Response) => {
    try {
        const { name, description, permission } = req.body
        const id = new ObjectId(req.params.id)
        const resource = await Resource.updateOne({ _id: id }, { $set: { name, description, permission } })
        if (!resource.acknowledged) {
            return res.json({ success: false, message: "Error Updating Resource" })
        }
        return res.json({ success: true, message: "Resource Updated Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const deleteResource = async (req: Request, res: Response) => {
    try {
        const id = new ObjectId(req.params.id)
        const deleteResourceFromDB = await Resource.deleteOne({ _id: id })
        if (!deleteResourceFromDB.acknowledged) {
            return res.json({ success: false, message: "Error Deleting Resource" })
        }
        return res.json({ success: true, message: "Resource Deleted Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { getAllResources, createResource, updateResource, deleteResource }