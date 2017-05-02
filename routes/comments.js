const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// add comment
router.post('/add', (req, res, next) => {
  let newComment = new Comment({
    clientId: req.body.clientId,
    message: req.body.message,
    user: req.body.user,
    commentType: req.body.commentType,
    isr: req.body.isr,
    bdm: req.body.bdm
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
router.get('/:clientId', (req, res, next) => {
  Comment.getCommentsbyClient(req.params.clientId, (err, comments) => {
    if (err) {
      console.error(err);
      res.json({ success: false, msg:'Failed to retrieve comments.'});
    }else {
      res.send(JSON.stringify(comments));
    }
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