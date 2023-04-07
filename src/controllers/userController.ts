import User from "../models/User"
import { Request, Response } from "express"
import bcrypt from "bcrypt"

const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body
        const alreadyExist = await User.findOne({ email })
        if (alreadyExist) {
            return res.json({ success: false, message: "Account Already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })
        if (!user) {
            return res.json({ success: false, message: "Error Creating User" })
        }
        return res.json({ success: true, message: "Account Created Successfully" })
    } catch (error: any) {

    }
}

export default { createUser }