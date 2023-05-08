// Import the User model and various middleware functions for authentication and authorization
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE 

router.post("/",verifyToken, async (req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})



// Update Product information endpoint
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{

  try {
    // Find the user with the given ID and update their information in the database
    const updatedOrder = await Order.findByIdAndUpdate(
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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Find the user with the given ID and delete them from the database
    await Order.findByIdAndDelete(req.params.id);
    // Return a success message in the response
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

//GET USer Order
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const orders = await Order.find({userId : req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }

});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req,res) => {
  try{
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
 

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth }, 
      ...(productId && {
        products:{$elemMatch:{productId}}
      } ) } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;