require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")
const app = express()
const port = process.env.PORT

connectDB()

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/events", eventRoutes)

app.get("/", (req, res) => {
	res.send("Bonjour, monde !")
})

app.listen(port, () => {
	console.log(`App écoute à http://localhost:${port}`)
})
