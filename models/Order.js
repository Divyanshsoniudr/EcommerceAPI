const mongoose = require("mongoose")

// Define the order schema
const OrderSchema = new mongoose.Schema(
    {
        // ID of the user who made the order
        userId:{type:String, required: true}, 
        // An array of products that were ordered, each with its own product ID and quantity
        products:[
            {
                productId:{
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        // Total amount of the order
        amount: {type:Number, required:true},
        // Address where the order will be shipped
        address:{type:Object , required: true},
        // Status of the order (e.g. pending, shipped, delivered, etc.)
        status: {type: String, default: "pending"}
    },
    {timestamps:true}
);

// Export the order model
module.exports = mongoose.model("Order",OrderSchema);
