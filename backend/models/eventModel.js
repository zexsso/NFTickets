const mongoose = require("mongoose")
const { v4: uuidv4 } = require("uuid")

const eventSchema = new mongoose.Schema({
	name: { type: String, required: true },
	date: { type: Date, required: true },
	address: { type: String, required: true },
	place: { type: String, required: true },
	city: { type: String, required: true },
	country: { type: String, required: true },
	id: { type: String, default: uuidv4 },
	tickets: { type: Number, default: 0 },
})

module.exports = mongoose.model("Event", eventSchema)
