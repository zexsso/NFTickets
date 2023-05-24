require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const cookieParser = require('cookie-parser');
const cors = require("cors")

const authRoutes = require("./routes/auth")
const eventRoutes = require("./routes/events")
const saleRoutes = require("./routes/sales")
const tradeRoutes = require("./routes/trade")
const balanceRoutes = require("./routes/balance")

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
app.use("/", balanceRoutes)
app.use('/uploads', express.static('uploads'))

app.get("/", (req, res) => {
	res.send("Bonjour, monde !")
})

app.listen(port, () => {
	console.log(`App écoute à http://localhost:${port}`)
})
