const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Signupdata = new Schema( {
      username: { type:String , required: true , unique: true},
      password: { type: String , required: true},
      email: { type: String , required: true}
 },
 {
    collection: "SIGNUP_USER_DATA"
 }
)
module.exports = mongoose.model('UsersignupData' , Signupdata );