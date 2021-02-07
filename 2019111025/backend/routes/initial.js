const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usr = require("../models/User");


router.get("/", function(req, res) {
    usr.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

console.log("here");

router.post("/register", async(req, res) => {
    

        const {email,password,typeOfUser}  = req.body;
        const existinguser = await usr.findOne({email:email});
        

        if(existinguser)
            return res.json({msg : "Account already exists on this email ID, Please try with another ID",
                            status: "0"});
         
        const salt =  await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newuser = new usr({
        email,
        password :passwordHash,
        typeOfUser
        });
        
        console.log(newuser);
        newuser.save()
        .then(user => {
            res.json({user: newuser, status : "0"});
        })
        .catch(err => {
            res.json({msg: "Account on this email already exists"});
            console.log("Backend error");
        });
    
});



router.post("/login", async (req,res) => {
 
       const {email, password} = req.body;

       if(!email || !password)
       return res.json({msg :" Not all fields are filled",
                        status: "1"
                        });
       const user = await usr.findOne({email:email});

    if(!user) {
    console.log("email error");
    return res
            .json({msg: " No account with the given email exists",
                    status: "2"
                    });
            
    }
    const didmatch = await bcrypt.compare(password, user.password);
    if(!didmatch) {
        console.log("password error");
        return res
                .json({msg : " invalid credentials",
                        status: "3"
            });
    }
    res
        .json({ user: user ,
                status: "0"
        });
    console.log("end");

});


module.exports = router;