require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");


//using body parser for getting from URL body
app.use(bodyparser.json());






PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

