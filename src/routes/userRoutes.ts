import express, { Router } from "express"
import userController from "../controllers/userController"
import fetchUser from "../middlewares/fetchUser"

const router: Router = express.Router()
router.get('/get/details', fetchUser, userController.getUser)
router.get('/get/all', userController.getAllUsers)
router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/permission/:id",fetchUser, userController.getUserPermissions)
router.get("/permissions", fetchUser, userController.getPermissions)
export default router
