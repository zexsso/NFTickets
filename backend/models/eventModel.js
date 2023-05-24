const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
	{
		ticketId: { type: String, required: true },
		seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		price: { type: Number, required: true },
		onSaleDate: { type: Date, default: Date.now },
	},
	{ _id: false }
)

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    place: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    price: { type: Number, required: true },
    tickets: {
        type: Map,
        of: [String],
        required: true
    },
    total_tickets: { type: Number, required: true },
    sale_list: [saleSchema],
    image: String,
});

module.exports = mongoose.model("Event", eventSchema);
