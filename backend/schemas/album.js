var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = require('./comment.js');

var albumSchema = new Schema({
    title : String,
    cover : {
        type: String, 
        default: '/image/defaultCover.jpg'
    },
    duration : Number,
    release_date : Date,
    singer : {
        type : Schema.Types.ObjectId,
        ref : 'Artist'
    },
    genres : [{
        type: String, 
        default: 'unknown'
    }],
    comment : [commentSchema],
    tracks : [{
        type : Schema.Types.ObjectId,
        ref : 'Track'
    }]
});

module.exports = mongoose.model('Album', albumSchema);