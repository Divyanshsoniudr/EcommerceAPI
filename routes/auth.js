const router= require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
//REGISTER
router.post("/register", async (req,res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CCryptoJS.AES.encryp(req.body.password, process.env.PASS_SEC).toString,

    });
    try{
    const savedUSer = await newUSer.save()
    res.status(201).json(savedUser);
    }catch(err){
    res.status(500).json(err);
    }
});

//LOGIN

router.post("/login",async (req,res)=>{

    
})





module.exports = router;

