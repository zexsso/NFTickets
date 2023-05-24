const express = require("express")
const router = express.Router()
const Event = require("../models/eventModel")

// Setup Web3 and contract
const Web3 = require("web3")
const EsaipTickets = require("../../blockchain/build/contracts/EsaipTickets.json")
const web3 = new Web3("http://127.0.0.1:7545")
const contractAddress = "0xae97e3e339b885ee28593CCd28c6309614F42B24"
const contract = new web3.eth.Contract(EsaipTickets.abi, contractAddress)
const addressToMint = "0x5784682bE80458d99940Fda810804D52a83b5133" // Address to which the tickets will be minted

router.post("/create", async (req, res) => {
	try {
		const { name, date, address, place, city, country, tickets: ticketCount } = req.body
		const tickets = {}

		for (let i = 0; i < ticketCount; i++) {
			const concertId = 121 // Generate a unique ID for each ticket

			const tokenId = await contract.methods
				.safeMint(addressToMint, concertId)
				.send({ from: addressToMint, gas: 5000000 })
				.then((receipt) => {
					console.log("Ticket successfully minted for user: ", addressToMint, "with concert ID: ", concertId)
					return receipt.events.Transfer.returnValues.tokenId // Get tokenId from event
				})
				.catch((error) => {
					console.error("Error minting ticket for user: ", addressToMint, "with concert ID: ", concertId)
				})

			// Add the ticket ID to the list of tickets for the user
			if (!tickets[addressToMint]) {
				tickets[addressToMint] = []
			}
			tickets[addressToMint].push(String(tokenId))
		}

		const event = new Event({ name, date, address, place, city, country, tickets })
		const savedEvent = await event.save()

		res.status(201).json({ message: "Event successfully created", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during event creation", success: false })
	}
})

router.post("/transfer", async (req, res) => {
	try {
		const { senderAddress, receiverAddress, tokenId, eventId } = req.body

		// Find the event by ID
		const event = await Event.findById(eventId)
		if (!event) {
			res.status(400).json({ message: "Event not found", success: false })
			return
		}

		// Transfer the ticket
		await contract.methods
			.safeTransferFrom(senderAddress, receiverAddress, tokenId)
			.send({ from: senderAddress, gas: 5000000 })
			.then((receipt) => {
				console.log("Ticket successfully transferred from user: ", senderAddress, "to user: ", receiverAddress)
			})
			.catch((error) => {
				console.error("Error transferring ticket from user: ", senderAddress, "to user: ", receiverAddress)
				throw error
			})

		// Remove the ticket from the sender
		const senderTickets = event.tickets[senderAddress]
		if (!senderTickets || !senderTickets.includes(tokenId)) {
			res.status(400).json({ message: "Sender does not have the specified ticket", success: false })
			return
		}
		const ticketIndex = senderTickets.indexOf(tokenId)
		senderTickets.splice(ticketIndex, 1)

		// Add the ticket to the receiver
		if (!event.tickets[receiverAddress]) {
			event.tickets[receiverAddress] = []
		}
		event.tickets[receiverAddress].push(tokenId)

		// Save the changes
		await event.save()

		res.status(200).json({ message: "Ticket successfully transferred", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during ticket transfer", success: false })
	}
})

router.get("/:id", async (req, res) => {
	try {
		const eventId = req.params.id

		// Find the event by ID
		const event = await Event.findById(eventId)
		if (!event) {
			res.status(404).json({ message: "Event not found", success: false })
			return
		}

		// Respond with the event data
		res.status(200).json({ event: event, success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error while fetching event", success: false })
	}
})

module.exports = router