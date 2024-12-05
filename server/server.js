require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/Connectdb.js");
const cors = require("cors");
const UsersignupData = require("./model/UsersignupData.js");
const newpost = require('./model/NewPostData.js')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");



//connect to DB
connectDB();

//using body parser for getting from URL body
app.use(bodyparser.json());

// Enable CORS with specified origin for frontend communication
app.use(cors({ origin: "http://localhost:5173" }));

// Secret key for JWT, stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET;



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
    if( !email , !password  ) return res.status(400).json( {msge : "all feilds are required"});

   try {
      //check if username exist or not
      const alreadyEx = await UsersignupData.findOne({ email });
      if( !alreadyEx ) return res.status(400).json( {msge : "not exist"});

      //check password is matched or not
      const matchedPW = await bcrypt.compare( password , alreadyEx.password )
      if( !matchedPW ) return res.status(400).json( {msge : "incorrect PW"});

      // now username and password is macthed then asing jwt token
      const token = jwt.sign(
        { id: alreadyEx._id, email: alreadyEx.email },
        JWT_SECRET,
        { expiresIn: "1h"}
    )
      return res.status(200).json({msge:"signup success" , userdetails: alreadyEx, token: token })

   } catch (error) {
    console.log(error);
    return res.status(500).json({msge:"error while login"})
   }
})


//getting post req for new post data
app.post("/new-post" , async( req , res ) => {
   const { username , newpostText , day , month , year , image } = req.body;
   if( !username || !newpostText || !day || !month || !year || !image ) return res.status(400).json({ msge: "some value are empty check details again"});

   try {

   } catch (error) {
      
   }




})








PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

