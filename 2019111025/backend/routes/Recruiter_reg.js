const express = require("express");
const router = express.Router();
const rec = require("../models/Recruiter");

router.post("/", (req,res) => {
    const {name,email,contactNum,bio}  = req.body;

    console.log("here");

    const newrecruiter = new rec({
        name,
        email,
        contactNum,
        bio
        });

        console.log(newrecruiter);
        newrecruiter.save()
        .then( recruiter => {
            res.json({recruiter: newrecruiter, status: "0"});
            console.log(recruiter);
        })
        .catch(err => {
            console.log("Backend error");
            console.log(err);
        });
});

module.exports = router;