require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');
const cors = require("cors")

const checkAuth = require("./middlewares/checkAuth")

const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")
const saleRoutes = require("./routes/sales")
const tradeRoutes = require("./routes/trade")
const userRoutes = require("./routes/user")

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
app.use(cookieParser());

app.use("/auth", authRoutes)
app.use("/events", eventRoutes)
app.use("/sales", saleRoutes)
app.use("/trade", tradeRoutes)
app.use("/", userRoutes)
app.use('/uploads', express.static('uploads'))

app.get("/", checkAuth, async (req, res) => {
	try {
		// Send response
		res.status(200).json({ user: req.user })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error sending the user" })
	}
})


app.listen(port, () => {
	console.log(`App écoute à http://localhost:${port}`)
})
