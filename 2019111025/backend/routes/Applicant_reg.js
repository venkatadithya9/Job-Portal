const express = require("express");
const router = express.Router();
const appl = require("../models/Applicant");

router.post("/", (req,res) => {
    const {name,email,skills, education}  = req.body;
//what to do about rating
    const newapplicant = new appl({
        name,
        email,
        skills,
        education
        });

        console.log(newapplicant);
        newapplicant.save()
        .then( applicant => {
            res.json({applicant, status: "0"});
            console.log(applicant);
        })
        .catch(err => {
            res.json({msg: "Error during registration", status: "1"});
            console.log("Backend error");
        });
});

module.exports = router;