const express = require("express")
const multer = require("multer")
const router = express.Router()
const Event = require("../models/eventModel")

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
				.safeMint(adminWallet, concertId)
				.send({ from: adminWallet, gas: 5000000 })
				.then((receipt) => {
					console.log("Ticket successfully minted for user: ", adminWallet, "with concert ID: ", concertId)
					return receipt.events.Transfer.returnValues.tokenId // Get tokenId from event
				})
				.catch((error) => {
					console.error("Error minting ticket for user: ", adminWallet, "with concert ID: ", concertId)
				})

			// Add the ticket ID to the list of tickets for the user
			if (!tickets[adminWallet]) {
				tickets[adminWallet] = []
			}
			tickets[adminWallet].push(String(tokenId))
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
