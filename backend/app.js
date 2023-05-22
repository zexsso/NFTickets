require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")
const cors = require("cors")
const app = express()
const port = process.env.PORT

connectDB()

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true
	})
)
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/events", eventRoutes)

app.get("/", (req, res) => {
	res.send("Bonjour, monde !")
})

app.listen(port, () => {
	console.log(`App écoute à http://localhost:${port}`)
})
