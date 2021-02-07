const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
        unique: true
	},
	contactNum:{
		type: String
    },
    bio: {
        type: String
	},
	rating: {
		type: Number,
		default: 2.5
	}
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);
