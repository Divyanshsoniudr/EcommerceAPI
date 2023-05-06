// Import the User model and various middleware functions for authentication and authorization
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

// Update user information endpoint
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  // If request body contains a 'password' field, encrypt it using AES encryption
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    // Find the user with the given ID and update their information in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // Return the updated user information in the response
    res.status(200).json(updatedUser);
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

// Delete user endpoint
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Find the user with the given ID and delete them from the database
    await User.findByIdAndDelete(req.params.id);
    // Return a success message in the response
    res.status(200).json("User has been deleted...");
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

// Get all users information endpoint
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
    // Find the user with the given ID in the database
    const user = query 
    ? await User.find().sort({_id:-1}).limit(5)
    : await User.find();
     // Return all user information except the password in the response
    res.status(200).json(users);
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1 ));
    try{

        const data = await User.aggregate([
            {$match: {createdAt: {$gte : lastYear } } },
            {
                $project:{
                    month: {$month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: " $month",
                    total:{ $sum: 1},
                }
            }
        ]);
     res.status(200).json(data)
    }catch (err){

        res.status(500).json(err);
    }

});





// Export the router for use in other parts of the application
module.exports = router;