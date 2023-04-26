// Import the User model and various middleware functions for authentication and authorization
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE 

router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})



// Update Product information endpoint
router.put("/:id", verifyTokenAndAdmin, async (req, res) =>{

  try {
    // Find the user with the given ID and update their information in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // Return the updated user information in the response
    res.status(200).json(updatedProduct);
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
 });

// Delete user endpoint
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // Find the user with the given ID and delete them from the database
    await Product.findByIdAndDelete(req.params.id);
    // Return a success message in the response
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    // Handle errors by returning a 500 status code and the error message in the response
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }

});

//GET all products
router.get("/",  async (req, res) => {
  const qNew  = req.query.new
  const qCategory = req.query.category;
  try {
    let products; 
    if(qNew){
      products = await Product.find().sort({createdAt: -1}).limit(1)
    }else if(qCategory){
      products = await Product.find({categories:{
        $in: [qCategory],
      }})
    }else{
      products = await Product.find();
    }


    res.status(200).json(products);
} catch (err) {
    res.status(500).json(err);
}
});


// Export the router for use in other parts of the application
module.exports = router;