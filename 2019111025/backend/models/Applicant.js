const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
/*const educationSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId
    },
    instName: {
        type: String
    },
    stYear: {
        type: Number
    },
    endYear: {
        type: Number
    }
});*/

const ApplicantSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
    },
    skills: {
        type: String
    },
    rating: {
        type: Number,
        default: 2.5
    },
    noOfApps: {
        type: Number,
        default: 0
    },
	education: [{instName: {type:String}, stYear: {type: String}, endYear: {type: String}}]
});




module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);
//module.exports = Education = mongoose.model("Education", educationSchema);