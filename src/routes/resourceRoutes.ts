import express, { Router } from "express"
import resourceController from "../controllers/resourceController"

const router: Router = express.Router()

router.get('/get/all', resourceController.getAllResources)
router.post('/create', resourceController.createResource)

export default router
