import express, { Router } from "express"
import roleController from "../controllers/roleController"

const router: Router = express.Router()

router.get('/get/all', roleController.getAllRoles)
router.post('/create', roleController.createRole)

export default router
