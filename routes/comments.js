const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// add comment
router.post('/add', (req, res, next) => {
  let newComment = new Comment({
    author: req.body.author,
    client: req.body.client,
    authorMail: req.body.email,
    authorUsername: req.body.username,
    text: req.body.text,
    date: Date.now()
  });

  Comment.addComment(newComment, (err, comment) => {
    if(err){
      res.json({success: false, msg:'Failed to add comment'});
    } else {
      res.json({success: true, msg:'Comment added'});
    }
  });
});

// find Comment
router.get('/data/:id', (req, res, next) => {
  console.log('req.params.id',req.params.id)
  Comment.findComments(req.params.id, function(err, comments){
    res.send(JSON.stringify(comments));
  });
});

module.exports = router;