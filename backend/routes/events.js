const express = require("express")
const router = express.Router()
const Event = require("../models/eventModel")

router.post("/create", async (req, res) => {
	try {
		const event = new Event(req.body)
		const savedEvent = await event.save()
		res.status(201).json({ message: "Event successfully created", success: true })
	} catch {
		res.status(500).json({ message: "Server error during event creation", success: false })
	}
})

module.exports = router
