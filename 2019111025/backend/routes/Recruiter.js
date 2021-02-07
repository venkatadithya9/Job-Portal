const express = require("express");
const Recruiter = require("../models/Recruiter");
const router = express.Router();
const apply = require("../models/Application");
const Job = require("../models/Job");

router.post("/profile", (req,res) => {
    const rec = Recruiter.findOne({email: req.body.email}, function(err, recruiter) {
        if(err)
        {
            console.log(err);
        } 
        else{
            res.json(recruiter);
        }
    })
});

router.post("/profile_edit", (req,res) => {
    const {name, email, contactNum, bio} = req.body;
    const newrec = {
        name: name,
        email: email,
        contactNum: contactNum,
        bio: bio
    }
    Recruiter.findOneAndUpdate({email: req.body.email}, newrec, function(err, recruiter) {
        if(err){
            //console.log(err);
            res.json({msg: "Error in updating profile",
            status: "1"});
            console.log("Failed");
        }
        else{
            res.json({msg:"Profile updated", status: "0", recruiter});
            console.log("Success");
            console.log(req);
        }
    })

})

router.post("/addJobListing", (req,res) => {
    const {title,nameOfRecruiter,emailOfRecruiter,maxApps,maxPosns,dop,deadline,reqSkills,typeOfJob,duration,salary,status,appsLeft,Recruiter_rating} = req.body;

    const newJob = new Job({
        title ,
        nameOfRecruiter,
        emailOfRecruiter,
        maxApps,
        maxPosns,
        dop,
        deadline,
        reqSkills,
        typeOfJob,
        duration,
        salary,
        status,
        appsLeft,
        Recruiter_rating
    })
    newJob.save()
    .then(job => {
        res.json({job, status : "0"});
        console.log(job);
    })
    .catch(err => {
        res.json({msg: "Job could not be added", status: "1"});
        console.log("Backend error");
        console.log(err);
    });
});

router.post("/alljobs", (req,res) => {
    Job.find({emailOfRecruiter: req.body.email}, function(err, searchResults) {
        if (err) {
            console.log(err);
            console.log("search error");
            res.json({status: "1"});
        }
        else{
            res.json({searchResults, status:"0"});
            console.log(searchResults);
        }
    })
})

router.post("/jobUpdate", (req,res) => {
    const obj={
        maxApps: req.body.maxApps,
        maxPosns: req.body.maxPosns
    }
    Job.findOneAndUpdate({_id: req.body._id}, obj, function(err,resp) {
        if(err){
            console.log(err);
            res.json({status: "1"});
        }
        else{
            res.json({status:"0"});
            console.log("Update Success");
        }
    })
});

router.post("/deletejob", function(req,res){
    Job.findOneAndDelete({_id:req.body._id},(err,docs)=>
    {  if(err)
         res.json({status:"1"});
         else 
         res.json({status:"0"});    
    });
});

module.exports = router;