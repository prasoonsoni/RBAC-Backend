import express, { Router } from "express"
import userController from "../controllers/userController"

const router: Router = express.Router()

router.get('/get/all', userController.getAllUsers)
router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)

export default router
