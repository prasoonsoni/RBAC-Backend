import express, { Router } from "express"
import permissionController from "../controllers/permissionController"

const router: Router = express.Router()

router.get('/get/all', permissionController.getAllPermissions)
router.post("/create", permissionController.createPermission)
router.put('/update/:id', permissionController.updatePermission)
router.delete('/delete/:id', permissionController.deletePermission)

export default router
