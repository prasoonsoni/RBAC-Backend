import express, { Router } from "express"
import adminController from "../controllers/adminController"

const router: Router = express.Router()

router.post('/role/add', adminController.addRole)
router.delete('/role/remove', adminController.removeRole)
router.post('/permission/add', adminController.addPermission)
router.delete('/permission/remove', adminController.removePermission)

export default router
