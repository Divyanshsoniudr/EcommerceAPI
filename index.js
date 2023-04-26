const express = require("express"); // Importing the express module
const app= express(); // Creating an instance of express
const mongoose = require("mongoose"); // Importing the mongoose module
const dotenv = require("dotenv"); // Importing the dotenv module to use environment variables
const userRoute = require("./routes/user"); // Importing user routes
const authRoute = require("./routes/auth"); // Importing authentication routes

dotenv.config(); // Configuring dotenv to use environment variables


mongoose.connect(
    process.env.MONGO_URL // Connecting to MongoDB using the connection string in the environment variable MONGO_URL

)

.then(()=>console.log("DBConnecton Successfull")) // If the connection is successful, log a message
.catch((err)=>{
    console.log(err); // If there's an error, log the error message
});

app.use(express.json()); // Parsing incoming JSON data
app.use("/api/auth", authRoute); // Using the authentication routes
app.use("/api/user", userRoute); // Using the user routes

app.listen(process.env.PORT || 5000, ()=>{ // Starting the server
    console.log("backend Server Running"); // Logging a message to indicate that the server has started
});