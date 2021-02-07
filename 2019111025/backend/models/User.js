const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

	email: {
		type: String,
        unique: true
	},
	password: {
        type: String
    },
    typeOfUser: {
        type: String,
        enum: ["Applicant", "Recruiter"]
    }
});

module.exports = User = mongoose.model("Users", UserSchema);
