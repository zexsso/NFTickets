const express = require("express")
const router = express.Router()
const Sale = require("../models/saleModel")
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

	// Create a new sale document
	const sale = new Sale({
		eventId: eventId,
		tickets: [
			{
				ticketId: ticketId,
				seller: seller,
				price: price,
			},
		],
	})

	try {
		const savedSale = await sale.save()
		res.status(201).json({ message: "Sale successfully created", success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during sale creation", success: false })
	}
})

// Get all sales for a specific event
router.get("/:id", async (req, res) => {
	const eventId = req.params.id

	try {
		const sales = await Sale.find({ eventId: eventId })
		if (!sales) {
			return res.status(404).json({ message: "No sales found for this event", success: false })
		}

		res.status(200).json({ sales: sales, success: true })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: "Server error during fetching sales", success: false })
	}
})

module.exports = router
