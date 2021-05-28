const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    question:{
        type: String,
        required: true
    },
    answers:[{
        _id : false,
        answer:{
            type:String
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }],
},{
    timestamps: true
});

const post = mongoose.model('post',PostSchema);
module.exports = post;