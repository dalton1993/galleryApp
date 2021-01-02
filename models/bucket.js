const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campground"
    }],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
},{timestamps:true});

module.exports = mongoose.model("Bucket", bucketSchema);
