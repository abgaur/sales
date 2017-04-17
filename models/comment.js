let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    clientId: String,
    message: String,
    user:  {name: String,
            email: String,
            username: String}
},{timestamps: true});

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback);
};

module.exports.findCommentsbyClient = function(id, callback){
    let query = {clientId: id};
    Comment.find(query, callback);
};

module.exports.updateComment = function(commentId, updateComment, callback){
    Comment.findByIdAndUpdate(commentId, updateComment, callback);
};