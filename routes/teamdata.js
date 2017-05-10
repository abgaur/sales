const express = require('express');
const router = express.Router();
const teamData = require('../models/teamdata');

router.post("/calltomeeting", (req, res, next) => {
    let arrBDM = req.body.bdm;
    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);
    teamData.getCallToMeeting(fromDate, toDate, arrBDM, (err, data) => {
        if(err){
            res.json({success: false, msg:'Failed to retrive team data'});
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

router.get("/topusers", (req, res, next) => {
    let currentMonth = new Date().getMonth()+1;
    let noOfUsers = 5;
    teamData.getTopUsersforMonth(currentMonth, noOfUsers, (err, data) => {
        if(err){
            res.json({success: false, msg:'Failed to retrive top users'});
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

router.get("/meetingsscheduled", (req, res, next) => {
    let noOfMonths = 4;
    teamData.getMeetingsScheduledforMonths(noOfMonths, (err, data) =>{
        if(err){
            res.json({success: false, msg:'Failed to retrive scheduled meetings'});
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

module.exports = router;