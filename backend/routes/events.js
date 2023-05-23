const express = require("express")
const router = express.Router()
const multer = require("multer")
const Event = require("../models/eventModel")

// Setup Web3 and contract
const Web3 = require("web3")
const EsaipTickets = require("../../blockchain/build/contracts/EsaipTickets.json")
const web3 = new Web3("http://127.0.0.1:7545")
const contractAddress = "0xe428503a4C8327EfD7579e85716fb62795A6C23b"
const contract = new web3.eth.Contract(EsaipTickets.abi, contractAddress)
const addressToMint = "0x0e78b52E897f58b9c9E80c8d9e9a1dfD283c829E"

// Multer setup
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/events")
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname)
	},
})

const upload = multer({ storage: storage })

router.post("/create", upload.single("image"), async (req, res) => {
	try {
		const { name, date, address, place, city, country, price, tickets: ticketCount } = req.body
		const tickets = {}
		const image = req.file.path
		const total_tickets = ticketCount
		const event = new Event({ name, date, address, place, city, country, price, tickets, total_tickets, image })
		const savedEvent = await event.save()

		for (let i = 0; i < ticketCount; i++) {
			const concertId = savedEvent._id.toString()

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

		// Update the event with the tickets
		savedEvent.tickets = tickets
		await savedEvent.save()

		res.status(201).json({ message: "Event successfully created", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during event creation", success: false })
	}
})

router.post("/transfer", async (req, res) => {
	try {
		const { senderAddress, receiverAddress, tokenId, eventId } = req.body

		const ticketId = parseInt(tokenId)

		// Find the event by ID
		const event = await Event.findById(eventId)
		if (!event) {
			res.status(400).json({ message: "Event not found", success: false })
			return
		}

		// Transfer the ticket
		await contract.methods
			.safeTransferFrom(senderAddress, receiverAddress, ticketId)
			.send({ from: senderAddress, gas: 5000000 })
			.then((receipt) => {
				console.log("Ticket successfully transferred from user: ", senderAddress, "to user: ", receiverAddress)
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

router.get("/", async (req, res) => {
	try {
		const events = await Event.find()
		if (events.length === 0) {
			res.status(404).json({ message: "No events found", success: false })
			return
		}
		res.status(200).json({ events: events, success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error while fetching events", success: false })
	}
})

module.exports = router
