const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewPost = new Schema( {
    username:{ type: String , required: true },
    newpostText:{ type: String , required: true },
    day:{ type: Number , required: true },
    month: { type: String , required: true },
    year: { type: Number , required: true },
    image: { type:String },
    likeCount:{ type:Number , default: 0 },
    likedby: [{ type: String }],
    comment: [{ type: String }],
    commentedBy:[{ type: String }]
},
{ collection: 'INSTA-NEW-POST-DATA' }
)

module.exports = mongoose.model('NewPostData' , NewPost );