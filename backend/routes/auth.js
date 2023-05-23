const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			creator: req.body.is_creator,
		})
		const savedUser = await user.save()
		res.status(201).json({ message: "User registered successfully", success: true })
	} catch {
		res.status(500).json({ message: "Server error during registration", success: false })
	}
})

router.post("/login", async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	if (user == null) {
		return res.status(400).json({ message: "User not found", success: false })
	}

	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
			// Set the token in a HttpOnly cookie
			res.cookie("token", token, { httpOnly: true })
			res.json({ message: "Login successful", success: true })
		} else {
			res.status(401).json({ message: "Incorrect username or password", success: false })
		}
	} catch {
		res.status(500).json({ message: "Server error during login", success: false })
	}
})

module.exports = router
