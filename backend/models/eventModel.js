const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    address: String,
    place: String,
    city: String,
    country: String,
    tickets: {
        type: Map,
        of: [String]
    },
	image: String,
});

module.exports = mongoose.model("Event", eventSchema);
