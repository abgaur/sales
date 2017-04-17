const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// add comment
router.post('/add', (req, res, next) => {
  let newComment = new Comment({
    clientId: req.body.clientId,
    message: req.body.message,
    user: req.body.user
  });

  Comment.addComment(newComment, (err, comment) => {
    if(err){
      res.json({success: false, msg:'Failed to add comment'});
    } else {
      res.json({success: true, msg:'Comment added', comment: comment});
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
        message: req.body.message,
        user: req.body.user
    };

    Comment.updateComment(commentId, updateComment, (err, comment) => {
      if (err) res.json({success: false, msg:'Failed to update comment'});
      return res.json({success: true, msg:'Updated comment data', comment: comment});
    });
});

module.exports = router;