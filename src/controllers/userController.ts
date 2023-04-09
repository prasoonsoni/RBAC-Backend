import User from "../models/User"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ObjectId } from "mongodb"
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "Th15i5TeM9JWT"

const getUser = async (req: any, res: Response) => {
    try {
        const user = await User.findOne({ _id: new ObjectId(req.user._id) }).select('-password')
        if (!user) {
            return res.json({ success: false, message: 'User Not Found.' })
        }
        return res.json({ success: true, message: 'User Found Successfully.', user })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({})
        return res.json({ success: true, message: "Users Found Successfully", data: users })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
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
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "Account Not Found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect Password.' })
        }
        const data = { user: { _id: user._id } }
        const token = jwt.sign(data, JWT_SECRET)
        return res.json({ success: true, message: 'User Logged In Successfully.', token })
    } catch (error: any) {
        console.log(error.message)
        return res.json({ success: false, message: "Internal Server Error Occurred" })
    }
}

const deleteUser = async (req: Request, res:Response) =>{
    try {
        const id = new ObjectId(req.params.id)
        const user = await User.deleteOne({_id:id})
        if (!user.acknowledged) {
            return res.json({ success: false, message: "Error Deleting User" })
        }else{
            return res.json({ success: false, message: "User Deleted Successfully"})   
        }

    } catch (error) {
        
    }
}

export default { getAllUsers, createUser, loginUser, getUser }