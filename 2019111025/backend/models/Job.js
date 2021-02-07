const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
        type: String
    },
    nameOfRecruiter: {
        type: String
    },
    emailOfRecruiter: {
        type: String,
    },
    maxApps: {
        type: Number
    },
    maxPosns: {
        type: Number
    },
    dop: {
        type: Date
    },
    deadline: {
        type: Date
    },
    reqSkills: {
        type: String 
    },

    typeOfJob: {
        type: String,
        enum: ['Full-time', 'Part-time', 'WFH']
    },
    duration: {
        type: Number
    },
    salary: {
        type: Number
        
    },
    status: {
        type: String,
        default: "Available"
    },
    appsLeft: {
        type: Number
    },
    Recruiter_rating: {
        type: Number
    },
    appEmails: [String]
});

module.exports = Job = mongoose.model("Jobs", JobSchema);
