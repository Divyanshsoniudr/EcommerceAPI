const express = require("express"); // Importing the express module
const app= express(); // Creating an instance of express
const mongoose = require("mongoose"); // Importing the mongoose module
const dotenv = require("dotenv"); // Importing the dotenv module to use environment variables
const userRoute = require("./routes/user"); // Importing user routes
const authRoute = require("./routes/auth"); // Importing authentication routes
const productRoute = require("./routes/product"); // Importing product routesre
const cartRoute = require("./routes/cart"); // Importing product routesre
const orderRoute = require("./routes/order"); // Importing product routesre
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config(); // Configuring dotenv to use environment variables


mongoose
.connect(process.env.MONGO_URL )
.then(()=>console.log("DB Connecton Successfull")) // If the connection is successful, log a message
.catch((err)=>{
    console.log(err); // If there's an error, log the error message
});

app.use(cors());
app.use(express.json()); // Parsing incoming JSON data
app.use("/api/auth", authRoute); // Using the authentication routes
app.use("/api/users", userRoute); // Using the user routes
app.use("/api/products", productRoute); 
app.use("/api/carts", cartRoute); 
app.use("/api/orders", orderRoute); 
app.use("/api/checkout",stripeRoute);


app.listen(process.env.PORT || 5000, ()=>{ // Starting the server
    console.log("backend Server Running"); // Logging a message to indicate that the server has started
});