let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    'author': String,
    'client': String,
    'authorMail': String,
    'authorUsername': String,
    'text': String
},{timestamps: true});

let Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback);
};

module.exports.findCommentsbyClient = function(id, callback){
    let query = {client: id};
    Comment.find(query, callback);
};

module.exports.updateComment = function(commentId, updateComment, callback){
    Comment.findByIdAndUpdate(commentId, updateComment, callback);
};