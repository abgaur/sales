var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    'author': String,
    'client': String,
    'authorMail': String,
    'authorUsername': String,
    'text': String 
});

var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

module.exports.addComment = function(newComment, callback) {
    newComment.save(callback);
};

module.exports.findComments = function(id, callback){
    Comment.find({ client: id }, function (err, client) {
        if (err) return console.error(err);
        return client;
    });
}