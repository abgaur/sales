const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    clientId: Schema.Types.ObjectId,
    message: String,
    user:  {name: String, email: String},
    isDeleted:  { type: Boolean, default: false },
    isr: String,
    bdm: {name: String, email: String},
    commentType: String
},{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback);
};

module.exports.getCommentsbyClient = function(clientId, callback){
    Comment.find({clientId}, callback).sort({"updatedAt" : 'desc'});
};

module.exports.updateComment = function(commentId, updateComment, callback){
    Comment.findByIdAndUpdate(commentId, updateComment, {new: true}, callback);
};