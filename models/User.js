// Importing the Mongoose library
const mongoose = require("mongoose")

// Defining a new user schema
const UserSchema = new mongoose.Schema(
    {
        username:{type:String, required: true, unique:true}, 
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        isAdmin:{
            type: Boolean,
            default:false,
        },
        img:{type:String}
    },
    {timestamps:true}
);

// Exporting the model for User collection based on UserSchema
module.exports = mongoose.model("User",UserSchema);