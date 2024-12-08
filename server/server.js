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
const path = require("path");



//connect to DB
connectDB();

//using body parser for getting from URL body
app.use(bodyparser.json());

// Enable CORS with specified origin for frontend communication
app.use(cors({ origin: "http://localhost:5173" }));

// Secret key for JWT, stored in environment variables
const JWT_SECRET = process.env.JWT_SECRET;

//import new post uploads folder as stactic file for showing post images
app.use( "/newpostuploads" , express.static( path.join(__dirname , "newpostuploads" )));

// Set up multer storage configuration
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     // Specify the folder where images will be uploaded
     cb(null,'newpostuploads'); // You may need to create the "uploads" folder
   },
   filename: (req, file, cb) => {
     // Generate a unique file name for each uploaded file
     cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1234567890.jpg
   },
 });

 // Create Multer instance with storage configuration
const upload = multer({ storage: storage });





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
app.post("/new-post" , upload.single("image") , async( req , res ) => {
   const { username , newpostText , day , month , year } = req.body;
   const image = req.file; //access the image from req
   if( !username || !newpostText || !day || !month || !year ) return res.status(400).json({ msge: "some value are empty check details again"});

   try {
      const createNewPost = await newpost.create({
            username: username,
            newpostText: newpostText,
            day: day,
            month: month,
            year: year,
            image: image ? `/newpostuploads/${image.filename}` : null, //store image path if available
      }); //save new post to db
      console.log( createNewPost );
      res.status(201).json({msge: "new post uploaded" , createNewPost })

   } catch (error) {
      console.log( error , "error while uploading new post");
      res.status(500).json({msge: `${error}`});

   }
    
})


//getting all post req and sending back all posts
app.get("/allpost" , async ( req , res ) => {  
   try {
       const allPosts = await newpost.find(); // fetching all the post data
       console.log(allPosts);
       res.status(200).json({ msge:"all data access done" , allPosts });

   } catch (error) {
      console.log("error while fecthing the data");
      res.status(404).json({msge:"error while fetching all the data please check route"})
   }
})


//getting req for post like and unlike
app.post("/post/likedby" , async( req , res ) => {
       const { id , username } = req.body;
       console.log( id , username );
       if( !id || !username ) return res.status(400).json({ msge: "id or username is not coming"});
       
       try {
           //first find the post from all posts
           const PostFound = await newpost.findById( id );
           if( !PostFound ) return res.status(404).json({ msge: "POST NOT FOUND"});
           
           // second check if user already like the post or not
           const alreadyLiked = PostFound.likedby.includes(username);
           //if already liked then
           if( alreadyLiked )
           {
              PostFound.likedby = PostFound.likedby.filter(  username => username != username );
              PostFound.likeCount--;
           } //IF NOT LIKES THEN ADD NEW USERNAME IN LIKEDBY ARRAY AND INCREASE LIKE COUNT
           else{
            PostFound.likedby.push(username);
            PostFound.likeCount++;
           }
           await PostFound.save();
           return res.status(200).json({ msge:"POST LIKE SUCCES" , likecount: PostFound.likeCount , post: PostFound })

       } catch (error) {
         console.log(error);
         return res.status(500).json({ msge: "Error updating post" });
       }

})

//GETTING ADD NEW COMMENT REQ
app.post("/posts/new-comment" , async( req , res ) => {
   const { post_id , commentedBy , newComment } = req.body;
   if( !post_id || !commentedBy , !newComment ) return res.status(400).json({ msge: "something missing please check , id or newcomment"});
  
   try {
   //first find post in which we want to add comment
   const FindPost = await newpost.findById(post_id);
   if( !FindPost ) return res.status(404).json({ msge: "Post not found"});
   //IF POST IS FOUND THEN ADD NEW COMMENT TO POST COMMENT ARRAY
   FindPost.comment.push(newComment);
   FindPost.commentedBy.push(commentedBy);
   await FindPost.save();   //AFTER PUSHING THE NEW COMMENT THEN SAVE 

   return res.status(200).json({ msge:"NEW COMMENT ADDED SUCCESS", POST: FindPost })
   } catch (error) {
     return res.status(500).json({ msge: "something went wrong when from BE" });
   }

})

//getting req for post comment
app.get("/posts/:id" , async( req , res ) => {
   const { id } = req.params;
   if( !id ) return res.status(404).json({"msge": "error while fetching the comments because post id is not found"});
   console.log( id );
   try {
       const FindPost = await newpost.findById(id); // finding the post by id
       return res.status(200).json({"msge":"post founded for showing comments" , post:FindPost });
   } catch (error) {
      return res.status(400).json({msge: "error while fetching the comments", error });
   }
})

//GETTING FOLLOW POST REQ
app.post("/follow-req/:post_username/:myusername" , async ( req, res ) => {
    const { post_username , myusername } = req.params;
    if( !post_username , !myusername ) return res.status(404).json({"msge":"post username or follower username is not coming"});
    
    try {
   //LET'S FIND USER WHICH WE WANT TO FOLLOW
    const finduser = await UsersignupData.findOne( { username : post_username } );
    const finduser_1 = await newpost.findOne( { username : post_username });
    if( !finduser ) return res.status(404).json({"msge":"username not found"});
    if( !finduser_1 )return res.status(404).json({"msge":"username not found"});

    //NOW IF USER IS FOUND THEN ADD FOLLOWER NAME IN FOLLOWEDBY ARRAY
    finduser.followby.push(myusername);
    finduser_1.followby.push(myusername);
    finduser.save();
    finduser_1.save();
    console.log( "find username is  this-->" , finduser );
    return res.status(200).json({"msge":"follow req success", finduser , finduser_1 });

    } catch (error) {
      return res.status(400).json({msge:"something went wrong when proccessing follow req by BE" , error });
    }

   })





PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

