import express from "express"
import { uri, PORT } from "./config.mjs"
import route from "./src/route.mjs"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Authorization"]
}))
mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.error("Error connecting to MongoDB", err)
})

app.use(express.json())
app.use("/", route)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})