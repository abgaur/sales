const express = require('express');
const router = express.Router();
const Stage = require('../models/stage');

router.get('/', (req, res, next) => {
    Stage.getStages((err, stages) => {
        if(err){
            res.json({success: false, msg:'Failed to retrive stages'});
        } else {
            res.send(JSON.stringify(stages));
        }
    })
});

module.exports = router;