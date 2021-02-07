const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//routes
var initial = require("./routes/initial");
var rec_register = require("./routes/Recruiter_reg");
var appl_register = require("./routes/Applicant_reg");
var applicant = require("./routes/Applicant");
var recruiter = require("./routes/Recruiter");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/keys').mongoURI;

// Connection to MongoDB
mongoose
    .connect(db,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

    const port = process.env.PORT || 5000;

// setup API endpoints
app.use("/initial", initial);
app.use("/rec_register", rec_register);
app.use("/appl_register", appl_register);
app.use("/applicant", applicant);
app.use("/recruiter", recruiter);

app.listen(port, () => console.log("Server is running on Port: " + port));