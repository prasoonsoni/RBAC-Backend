/// <reference path="../global.d.ts" />

import express, { Application, Request, Response } from "express"
import connectToMongoDB from "./database/connection"

const app: Application = express()
const PORT = process.env.PORT || 5000
connectToMongoDB()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Working Fine!!")
})


app.listen(PORT, () => {
    console.log(`App Listening at PORT=${PORT} and BASEURL=http://localhost:${PORT}`)
})
