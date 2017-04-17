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

// Get Comments by client
router.get('/data/:clientId', (req, res, next) => {
  Comment.findCommentsbyClient(req.params.clientId, (err, comments) => {
    if (err) return console.error(err);
    res.send(JSON.stringify(comments));
  });
});

//update Comment
router.post('/update', (req, res, next) => {
    let commentId =  req.body._id;
    let updateComment= {
        author: req.body.author,
        text: req.body.text
    };

    Comment.updateComment(commentId, updateComment, (err, comment) => {
      if (err) res.json({success: false, msg:'Failed to update comment'});
      return res.json({success: true, msg:'Updated comment data'});
    });
});

module.exports = router;