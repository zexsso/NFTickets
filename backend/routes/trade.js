const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Event = require("../models/eventModel")
const checkAuth = require("../middlewares/checkAuth")

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

router.post("/", checkAuth, async (req, res) => {
	try {
		const { tokenId, eventId, price } = req.body
		let senderAddress
		if (tokenId === "null") {
			console.log(ici)
			senderAddress = adminWallet
		} else {
			await contract.methods
				.ownerOf(tokenId)
				.call()
				.then((owner) => {
					senderAddress = owner
				})
				.catch((error) => {
					console.error("Error retrieving owner:", error)
				})
		}
		const receiverAddress = req.user.wallet

		const ticketId = parseInt(tokenId)

		// Find the event by ID
		const event = await Event.findById(eventId)
		if (!event) {
			res.status(400).json({ message: "Event not found", success: false })
			return
		}

		if (senderAddress != adminWallet) {
			const user = await User.findOne({ walletAddress: senderAddress })
			await web3.eth.personal.unlockAccount(senderAddress, user.username, 600) // 600 seconds = 10 minutes
		}

		// Transfer the ticket
		await contract.methods
			.safeTransferFrom(senderAddress, receiverAddress, ticketId)
			.send({ from: senderAddress, gas: 5000000 })
			.then(async (receipt) => {
				console.log("Ticket successfully transferred from user: ", senderAddress, "to user: ", receiverAddress)

				// Find sender user and remove the ticket from their array, if sender != adminWallet
				if (senderAddress != adminWallet) {
					const senderUser = await User.findOne({ walletAddress: senderAddress })
					if (!senderUser) {
						res.status(400).json({ message: "Sender not found", success: false })
						return
					}
					const ticketIndex = senderUser.tickets.findIndex((t) => t.ticketId == tokenId && t.eventId == eventId)
					if (ticketIndex != -1) {
						senderUser.tickets.splice(ticketIndex, 1)
						await senderUser.save()
					}
				}

				// Find receiver user and add the new ticket to their array
				if (receiverAddress != adminWallet) {
					const receiverUser = await User.findOne({ walletAddress: receiverAddress })
					if (!receiverUser) {
						res.status(400).json({ message: "Receiver not found", success: false })
						return
					}
					receiverUser.tickets.push({ eventId: eventId, ticketId: tokenId, price: price, purchaseDate: new Date() })
					await receiverUser.save()
				}
			})
			.catch((error) => {
				console.error("Error transferring ticket from user: ", senderAddress, "to user: ", receiverAddress)
				throw error
			})

		// Remove the ticket from the sender
		const senderTickets = event.tickets.get(senderAddress)
		if (!senderTickets || !senderTickets.includes(tokenId)) {
			res.status(400).json({ message: "Sender does not have the specified ticket", success: false })
			return
		}
		const ticketIndex = senderTickets.indexOf(tokenId)
		senderTickets.splice(ticketIndex, 1)

		// If the sender's ticket array is empty, delete the senderAddress from the map
		if (senderTickets.length === 0) {
			event.tickets.delete(senderAddress)
		} else {
			// Otherwise, update the sender's ticket array in the map
			event.tickets.set(senderAddress, senderTickets)
		}

		// Add the ticket to the receiver
		if (!event.tickets.has(receiverAddress)) {
			event.tickets.set(receiverAddress, [])
		}
		let receiverTickets = event.tickets.get(receiverAddress)
		receiverTickets.push(tokenId)
		event.tickets.set(receiverAddress, receiverTickets)

		if (senderAddress != adminWallet) {
			// Find the sale in the sale_list and remove it
			const user = await User.findOne({ walletAddress: senderAddress })
			const saleIndex = event.sale_list.findIndex((sale) => sale.ticketId == tokenId && sale.seller.toString() == user._id.toString())
			if (saleIndex != -1) {
				event.sale_list.splice(saleIndex, 1)
			}
		}

		// Save the changes
		await event.save()

		res.status(200).json({ message: "Ticket successfully transferred", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during ticket transfer", success: false })
	}
})

module.exports = router
