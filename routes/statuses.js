const express = require('express');
const router = express.Router();
const Status = require('../models/status');

router.get('/', (req, res, next) => {
    Status.getStatuses((err, statuses) => {
        if(err){
            res.json({success: false, msg:'Failed to retrive statuses'});
        } else {
            res.json({success: true, msg:'Retreive statuses', statuses: statuses});
        }
    })
});

module.exports = router;