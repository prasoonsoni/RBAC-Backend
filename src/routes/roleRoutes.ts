import express, { Router } from "express"
import roleController from "../controllers/roleController"

const router: Router = express.Router()

router.get('/get/all', roleController.getAllRoles)
router.post('/create', roleController.createRole)
router.put('/update/:id', roleController.updateRole)
router.delete('/delete/:id', roleController.deleteRole)
router.get('/get/:id',roleController.getRole)
export default router
