const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DATABASE_URI , {
            
        })
        console.log( "MONGODB CONNECTED SUCCESFULLY");
    } catch (error) {
        console.log("error while connecting to DB")
    }
}
module.exports = connectDB;