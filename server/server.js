require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/Connectdb.js");


//using body parser for getting from URL body
app.use(bodyparser.json());

//connect to DB
connectDB();





//geting post req for signupdata
app.post("/signup" , async( req , res ) => {
    
})









PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

