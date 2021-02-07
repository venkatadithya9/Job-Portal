const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
	JobID: {
		type: mongoose.Schema.Types.ObjectId
	},
	Applicant_name: {
		type: String
	},
	Applicant_email: {
		type: String,
        unique: true
    },
    Recruiter_name: {
		type: String
	},
	Recruiter_email: {
		type: String,
        unique: true
	},
	state:{
		type: String
    },
    sop: {
        type: String
	},
	jobTitle: {
		type: String
	}
});

module.exports = Application = mongoose.model("Applications", ApplicationSchema);
