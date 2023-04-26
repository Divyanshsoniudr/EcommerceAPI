// Import the User model and various middleware functions for authentication and authorization
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE 

router.post("/",verifyToken, async (req,res)=>{
    const newCart = new Cart(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
})



// Update Product information endpoint
router.put("/:id", verifyTokenAndAuthorization, async (req, res) =>{

  try {
    // Find the user with the given ID and update their information in the database
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // Return the updated user information in the response
    res.status(200).json(updatedCart);
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
 });

// Delete user endpoint
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // Find the user with the given ID and delete them from the database
    await Cart.findByIdAndDelete(req.params.id);
    // Return a success message in the response
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

//GET USer Cart
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId : req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }

});

 // Get All 

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts =await Cart.find()
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})

// Export the router for use in other parts of the application
module.exports = router;