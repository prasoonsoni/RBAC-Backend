import Example from "../models/Example"
import ExampleBody from "../interfaces/ExampleBody"
import { Request, Response } from "express"

const createExample = async (req: Request, res: Response) => {
    try {
        const data: ExampleBody = req.body
        const example = await Example.create(data.email)
        if (!example) {
            return res.json({ success: false, message: "Error Creating Example" })
        }
        return res.json({ success: true, message: "Example Created Successfully" })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

export default { createExample }