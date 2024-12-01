require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/Connectdb.js");
const cors = require("cors");
const UsersignupData = require("./model/UsersignupData.js");

//using body parser for getting from URL body
app.use(bodyparser.json());

// Enable CORS with specified origin for frontend communication
app.use(cors());


//connect to DB
connectDB();





//geting post req for signupdata
app.post("/signup" , async( req , res ) => {
    const { username , password , email } = req.body;
    if( !username || !password , !email ) return res.status(400).json( {msge : "all feilds are required"});

   try {
      //hash the pw     

   } catch (error) {
    
   }



})









PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

