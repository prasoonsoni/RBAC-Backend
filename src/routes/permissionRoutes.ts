import express, { Router } from "express"
import permissionController from "../controllers/permissionController"

const router: Router = express.Router()

router.post("/create", permissionController.createPermission)

export default router
