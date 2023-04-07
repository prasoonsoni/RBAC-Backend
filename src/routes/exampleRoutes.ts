import express, { Router } from "express"
import exampleController from "../controllers/exampleController"
const router: Router = express.Router()

router.post('/create', exampleController.createExample)

export default router