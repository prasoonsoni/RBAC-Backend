/// <reference path="../global.d.ts" />

import express, { Application, Request, Response } from "express"
import connectToMongoDB from "./database/connection"
import userRouter from "./routes/userRoutes"
import roleRouter from "./routes/roleRoutes"
import adminRouter from "./routes/adminRoutes"

const app: Application = express()
const PORT = process.env.PORT || 5000
connectToMongoDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Working Fine!!")
})

app.use('/user', userRouter)
app.use('/role', roleRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`App Listening at PORT=${PORT} and BASEURL=http://localhost:${PORT}`)
})
