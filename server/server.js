require("dotenv").config();
const express = require("express");
const app = express();

PORT = process.env.PORT || 4000;

app.listen( PORT , () => {
    console.log( `server running on ${PORT}`);
}) 

