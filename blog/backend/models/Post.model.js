const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
})

const Post = mongoose.model('Post',PostSchema);

module.exports = Post;