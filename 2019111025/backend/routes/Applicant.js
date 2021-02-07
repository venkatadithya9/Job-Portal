const { response } = require("express");
const express = require("express");
const Applicant = require("../models/Applicant");
const router = express.Router();
const apply = require("../models/Application");
const Job = require("../models/Job");

router.post("/profile", (req,res) => {
    Applicant.findOne({email: req.body.email}, function(err, applicant) {
        if(err) throw err;
        else{
            res.json({applicant, status:"0"});
            console.log(applicant);
        }
    })
});

router.post("/profile_edit", (req,res) => {
    const {name, email, skills, education} = req.body;
    const newappl = {
        name: name,
        email: email,
        skills: skills,
        education: education
    }
    Applicant.findOneAndUpdate({email: req.body.email}, newappl, function(err, applicant) {
        if(err){
            //console.log(err);
            console.log("backend error");
            res.json({msg: "Error in updating profile",
            status : "1"});
        }
        else{
            res.json({msg:"Profile updated", status: "0"});
        }
    })

});

router.get("/jobSearch", (req,res) => {
    //const {searchQuery, sortBy} = req.body;
    /*const srh = {
        searchQuery: req.body.searchQuery,
        sortBy: req.body.sortBy
    };*/
    //console.log(req.body);
/*
    Job.updateMany({appsLeft:0, status:"Available"},  
        {$set: {status: "Filled"}}, function (err, jobs) { 
        if (err){ 
            console.log(err);
            console.log("Update Many error");
        } 
        else{ 
            console.log("Updated jobs : ", jobs); 
        } 
    });
*/
    console.log("done yo");

    /*if(req.body.sortBy==="Salary"){
        Job.find({title: {$regex: req.body.searchQuery}, status:"Available"},function(err, searchResults) {
            if (err) throw err;
            res.json(searchResults)
        }).sort({salary: 1});
    }

    else if(req.body.sortBy==="Rating"){
        Job.find({title: req.body.searchQuery, status:"Available"},function(err, searchResults) {
            if (err) throw err;
            res.json(searchResults)
        }).sort({Recruiter_rating: -1});
    }

    else if(req.body.sortBy==="Duration"){
        Job.find({title: req.body.searchQuery, status:"Available"},function(err, searchResults) {
            if (err) throw err;
            res.json(searchResults)
        }).sort({duration: -1});
    }*/

   
        Job.find(function(err, searchResults) {
            if (err) {
                console.log(err);
                console.log("search error");
                res.json({status: "1"});
            }
            else{
                res.json({searchResults, status:"0"});
                console.log(searchResults);
            }
        });
    
    
});

router.post("/applyForJob", (req,res) => {
    const {JobID,Applicant_name,Applicant_email,Recruiter_name,Recruiter_email, state, sop,jobTitle}  = req.body;

    console.log("here");

    const newapplication = new apply({
        JobID,
        Applicant_name,
        Applicant_email,
        Recruiter_name,
        Recruiter_email,
        state,
        sop,
        jobTitle
        });
       

        Job.findOneAndUpdate({_id: req.body.JobID, appsLeft: {$ge:1}}, {$inc:{appsLeft:-1}}, function(err, job) {
            if(err) { 
                console.log(err);
                console.log("appsLeft update error");
            } 
            console.log(job);
        });

        Job.findOneAndUpdate({_id: req.body.JobID}, { $push: {appEmails:apply.Applicant_email}}, function(err, job) {
            if(err) { 
                console.log(err);
                console.log("appEmail update error");
            } 
            console.log(job);
        });

        console.log(newapplication);
        newapplication.save()
        .then( newappl => {
            res.json({newappl, status: "0"});
            console.log(newappl);
        })
        .catch(err => {
            console.log("Backend error");
            console.log(err);
        });


});

router.post("/updateApps", (req,res) => {
    Applicant.findOneAndUpdate({email: req.body.email, noOfApps: {$le:9}}, {$inc: {noOfApps: 1}}, function(err, applicant) {
        if(err){
            //console.log(err);
            console.log("backend error");
            res.json({msg: "Application Limit Reached!",
            status : "1"});
        }
        else{
            res.json({msg:"Number of applications updated", status: "0", applicant});
            console.log("No of apps updated");
        }
    })
});

router.post("/myapps", (req,res) => {
    let final = [];
    apply.find({Applicant_email: req.body.email}, function(err, apps) {
        if (err) {
            console.log(err);
            console.log("retrieval error");
            res.json({status: "1"});
        }
        else{
            //res.json({apps, status:"0"});
            //console.log(apps);
            const l = apps.length;
            let cnt = 0;
            apps.map((app, i) => {
                let add={};
                add.jobTitle = app.jobTitle;
                add.Recruiter_name = app.Recruiter_name;
                add.Recruiter_email = app.Recruiter_email;
                add.state = app.state;
                console.log(add);
                Job.findOne({_id: app.JobID})
                    .then( job => {
                        add.salary = job.salary;
                        add.dop = job.dop;
                        console.log(add);
                        cnt += 1;
                    })
                    .then( () => {
                        final.push(add);
                        if(cnt == l) {
                            console.log(final);
                            res.json({final, status:"0"});
                        }
                    })
            });
        }
    })
});

router.post("/findJob", (req,res) => {
    console.log("entered findJob");
    Job.findOne({_id: req.body.JobID}, function(err,info) {
        if (err) {
            console.log(err);
            console.log("retrieval error");
            res.json({status: "1"});
        }
        else{
            res.json({info, status:"0"});
            console.log(info);
        }
    })
    
})


module.exports = router;