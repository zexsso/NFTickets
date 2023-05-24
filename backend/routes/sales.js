const express = require("express")
const router = express.Router()
const User = require("../models/userModel")
const Event = require("../models/eventModel")

// Post a new sale
router.post("/add_to_sale", async (req, res) => {
	const { eventId, ticketId, seller, price } = req.body

	// Check if event exists
	const event = await Event.findById(eventId)
	if (!event) {
		return res.status(404).json({ message: "Event not found", success: false })
	}

	// Check if user exists
	const user = await User.findById(seller)
	if (!user) {
		return res.status(404).json({ message: "User not found", success: false })
	}

	// Create a new sale document and add it to the event
	const sale = {
		ticketId: ticketId,
		seller: seller,
		price: price,
	}

	event.sale_list.push(sale)

	try {
		await event.save()
		res.status(201).json({ message: "Sale successfully added to the event", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during sale creation", success: false })
	}
})


// Get all events with tickets on sale
router.get("/", async (req, res) => {
	try {
		const events = await Event.find({ "sale_list.0": { $exists: true } })
		if (events.length === 0) {
			return res.status(404).json({ message: "No events with tickets on sale", success: false })
		}

		res.status(200).json({ events: events, success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during fetching events", success: false })
	}
})

module.exports = router
