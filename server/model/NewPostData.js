const mongoose = require("mongoose");
const Schema = new Schema();

const NewPost = new Schema( {
    username:{ type: String , required: true },
    newpostText:{ type: String , required: true },
    day:{ type: Number , required: true },
    month: { type: String , required: true },
    year: { type: Number , required: true },
    image: { type:String },
    likeCount:{ type:Number , default: 0 },
    likedby: [{ type: String }],
    comment: [{ type: String }]
})

module.exports = mongoose.model('NewPostData' , NewPost );