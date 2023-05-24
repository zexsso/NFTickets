const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema(
	{
		eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
		ticketId: { type: String, required: true },
		price: { type: Number, required: true },
		purchaseDate: { type: Date, default: Date.now },
	},
	{ _id: false }
) // This is to prevent creation of an id for the sub-document

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	creator: { type: Boolean, required: true },
	walletAddress: { type: String },
	tickets: [ticketSchema],
})

module.exports = mongoose.model("User", userSchema)