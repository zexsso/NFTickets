const express = require("express")
const multer = require("multer")
const router = express.Router()
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Web3 = require("web3") // You need to install this package. Node.js does not have fetch built-in.
const web3 = new Web3("http://127.0.0.1:7545")

const { get_infos } = require("../scripts/web3setup")
// Setup Web3 and contract
let adminWallet
let contract
get_infos().then((infos) => {
	adminWallet = infos.adminWallet
	contract = infos.contract
})

// Multer setup
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/avatar")
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname)
	},
})

const upload = multer({ storage: storage })

router.post("/register", upload.single("image"), async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10)
		// Create a new Ethereum wallet
		const newAccount = await web3.eth.personal.newAccount(req.body.username)
		// Send 5 ETH to the new wallet
		await web3.eth.sendTransaction({ to: newAccount, from: adminWallet, value: web3.utils.toWei("5", "ether") })

		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			creator: req.body.is_creator,
			walletAddress: newAccount,
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
