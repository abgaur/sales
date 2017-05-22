const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Stage = require('../models/stage');

router.get('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Stage.getStages((err, stages) => {
        if(err){
            res.json({success: false, msg:'Failed to retrive stages'});
        } else {
            res.send(JSON.stringify(stages));
        }
    })
});

module.exports = router;