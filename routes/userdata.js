const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userData = require('../models/userdata');

router.post("/callreport", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let arrBDM = req.body.bdm;
    let arrISR = req.body.isr;
    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);
    let groupBy = req.body.groupBy;
    userData.getCallReport(fromDate, toDate, arrBDM, arrISR, groupBy, (err, data) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

router.post("/clientreport", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let arrBDM = req.body.bdm;
    let arrISR = req.body.isr;
    let fromDate = new Date(req.body.fromDate);
    let toDate = new Date(req.body.toDate);
    userData.getClientWiseCallReport(fromDate, toDate, arrBDM, arrISR, (err, data) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

module.exports = router;