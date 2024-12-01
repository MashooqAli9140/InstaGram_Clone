require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/Connectdb.js");
const cors = require("cors");
const UsersignupData = require("./model/UsersignupData.js");
const bcrypt = require("bcrypt");


//connect to DB
connectDB();

//using body parser for getting from URL body
app.use(bodyparser.json());

// Enable CORS with specified origin for frontend communication
app.use(cors({ origin: "http://localhost:5173" }));







//geting post req for signupdata
app.post("/signup" , async( req , res ) => {
    const { username , password , email } = req.body;
    if( !username || !password , !email ) return res.status(400).json( {msge : "all feilds are required"});
    console.log( username , password , email);

   try {
      //hash the pw
      const HashedPW = await bcrypt.hash( password , 10 );
      const SaveUserData = await UsersignupData.create( {
        username,
        HashedPW,
        email
      })
      console.log(SaveUserData);
    return res.status(201).json({msge:"user Signup Data stored Success" , SaveUserData })
   } catch (error) {
    console.log(error);
    return res.status(400).json({msge:"user Signup Data stored Success"})
   }

})









PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

