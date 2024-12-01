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
   try {
      //check if username already exist or not
      const alreadyEx = await UsersignupData.findOne({ username , email });
      if( alreadyEx ) return res.status(509).json( {msge : "already exist"});
      
      //hash the pw
      const HashedPW = await bcrypt.hash( password , 10 );
      const SaveUserData = await UsersignupData.create( {
        username: username,
        password: HashedPW,
        email: email
      })

      console.log(SaveUserData);
      return res.status(201).json({msge:"user Signup Data stored Success" , SaveUserData })
   } catch (error) {
    console.log(error);
    return res.status(400).json({msge:"error while storing the data"})
   }
})



//geting post req for login
app.post("/login" , async( req , res ) => {
    const { email , password } = req.body;
    if(  !password , !email ) return res.status(400).json( {msge : "all feilds are required"});

   try {
      //check if username exist or not
      const alreadyEx = await UsersignupData.findOne({ email });
      if( !alreadyEx ) return res.status(400).json( {msge : "not exist"});

      //hash the pw
      const HashedPW = await bcrypt.hash( password , 10 );
      const SaveUserData = await UsersignupData.create( {
        username: username,
        password: HashedPW,
        email: email
      })

      console.log(SaveUserData);
      return res.status(201).json({msge:"user Signup Data stored Success" , SaveUserData })
   } catch (error) {
    console.log(error);
    return res.status(400).json({msge:"error while storing the data"})
   }
})









PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

