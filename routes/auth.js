// Import required modules
const router= require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
router.post("/register", async (req,res)=> {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

    });
    try{
        // Save the user object to the database
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
    }catch(err){
    res.status(500).json(err);
    }
});

//LOGIN

router.post("/login",async (req,res)=>{
    try{
        // Check if user exists in the database
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong Creentials!")
         // Decrypt the password and compare with the input password
        const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.PASS_SEC
        );
        const OriginalPassword= hashedPassword.toString(CryptoJS.env.Utf8);
        OriginalPassword !==req.body.password && 
          res.status(401).json("Wrong Credentials!");
         // Create an access token using JWT
          const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,
          }, process.env.JWT_SEC,
          {expiresIn: "3d"})

     // Return user data and access token
      const { password, ...others} = user._doc;
        
        res.status(200).json({...others, accessToken});
    } catch(err){
        res.status(500).json(err);
     }
});




// Export the router object
module.exports = router;

