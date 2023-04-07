import express, { Router } from "express"
import adminController from "../controllers/adminController"

const router: Router = express.Router()

router.post('/role/add', adminController.addRole)
router.delete('/role/remove', adminController.removeRole)

export default router
