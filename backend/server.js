import express from "express"
import cors from "cors"
import resturants from "./api/resturants.route.js"

// starting the express
const app = express()

// middle ware
app.use(cors())
app.use(express.json())
app.use("/api/v1/restaurants", resturants)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app


