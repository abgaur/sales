const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    clientId: String,
    message: String,
    user:  {name: String,
            email: String,
            username: String},
    isDeleted:  { type: Boolean, default: false }
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback);
};

module.exports.findCommentsbyClient = function(clientId, callback){
    Comment.find({clientId}, callback);
};

module.exports.updateComment = function(commentId, updateComment, callback){
    Comment.findByIdAndUpdate(commentId, updateComment, callback);
};