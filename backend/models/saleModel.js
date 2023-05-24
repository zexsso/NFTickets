const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
	ticketId: { type: String, required: true },
	seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	price: { type: Number, required: true },
	onSaleDate: { type: Date, default: Date.now },
})

const saleSchema = new mongoose.Schema({
	eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
	tickets: [ticketSchema],
})

module.exports = mongoose.model("Sale", saleSchema)
