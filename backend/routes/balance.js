const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Web3 = require("web3") // You need to install this package. Node.js does not have fetch built-in.
const web3 = new Web3("http://127.0.0.1:7545")
const checkAuth = require('../middlewares/checkAuth');

router.get("/get_balance", checkAuth, async (req, res) => {
	try {
		// Get user by ID
		const user = await User.findById(req.user.id)

		// Check if user exists
		if (!user) {
			return res.status(400).json({ message: "User not found" })
		}

		// Get user balance
		const balance = await web3.eth.getBalance(user.walletAddress)

		// Convert balance from wei to ether
		const balanceInEther = web3.utils.fromWei(balance, "ether")

		// Get the current Ether to USD price from CoinGecko
		const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
		const data = await response.json()
		const etherToUSD = data.ethereum.usd

		// Convert Ether balance to USD
		const balanceInUSD = balanceInEther * etherToUSD

		// Send response
		res.status(200).json({ ETH_balance: balanceInEther, USD_balance: balanceInUSD })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error getting user balance" })
	}
})

module.exports = router
