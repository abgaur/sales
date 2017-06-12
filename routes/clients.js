const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bodyParser = require('body-parser');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const Client = require('../models/client');
const clientHelper = require('../helpers/client.helper');
const redisHelper = require('../helpers/redis.helper');

// Upload
router.post('/upload/:email', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let uploadedBy = req.params.email;
    let exceltojson;
    let upload = clientHelper.getUploader();
    upload(req, res, function (err) {
        if (err) {
            res.json({ success: false, msg: 'Error in getting Uploader' });
            return;
        }
        /** Multer gives us file info in req.file object */
        if (!req.file) {
            res.json({ success: false, msg: 'No file passed' });
            return;
        }
        /** Check the extension of the incoming file and
         *  use the appropriate module
         */
        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, function (err, result) {
                if (err) {
                    return res.json({ success: false, msg: 'Failed to parse file' });
                }

                // extra code

                for (let i = 0; i < result.length; i++) {
                    if (result[i]['first name'] != '' && result[i]['last name'] != '') {
                        result[i].uploadedBy = uploadedBy;
                        let newClient = Client(clientHelper.createDBObjFromExcel(result[i]));
                        Client.addClient(newClient, (err, client) => {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to add client' });
                            } else {
                                redisHelper.setCacheData('client', newClient, function () {
                                    return false;
                                });
                            }
                        });
                    }
                }
                return res.json({ success: true, msg: 'Records Added' });
            });
        } catch (e) {
            return res.json({ success: false, msg: 'Records not Added' });
        }
    });
});


// fetch cached data based on user role
router.get('/data/:role', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let role = req.params.role;
    redisHelper.getCacheDatabyPattern('client', function (data) {
        if (data) {
            res.send(JSON.stringify(clientHelper.showRoleBasedClients(role, data)));
        } else {
            Client.find({}, function (err, client) {
                if (err) return console.error(err);
                else {
                    redisHelper.setCacheDatabyPattern('client', client, function () {
                    });
                    res.send(JSON.stringify(clientHelper.showRoleBasedClients(role, client)));
                }
            });
        }
    });
});


// fetch data by id
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Client.getClientById(req.params.id, (err, client) => {
        if (err) res.json({ success: false, msg: 'Failed to retrieve client' });
        res.send(JSON.stringify(client));
    });
});

// fetch data by assignTo
router.get('/assignto/:assignto', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Client.getClientByAssignTo(req.params.assignto, (err, client) => {
        if (err) res.json({ success: false, msg: 'Failed to retrieve client' });
        res.send(JSON.stringify(client));
    });
});

// multi-update assingnto
router.post('/assignto', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let assignTo = req.body.assignTo;
    let ids = req.body.ids;
    Client.updateAssignedTo(ids, assignTo, (err, docs) => {
        if (err) res.json({ success: false, msg: 'Failed to update assignee' });
        Client.getClientsByIds(ids, (err, docs) => {
            redisHelper.setCacheDatabyPattern('client', docs, function () {
                return res.json({ success: true, msg: 'Assigned to updated for '+ docs.length + ' clients' });
            });
        });
    });
});

// multi-update bdm
router.post('/bdm', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let bdm = req.body.bdm;
    let ids = req.body.ids;
    Client.updateBdm(ids, bdm, (err, docs) => {
        if (err) res.json({ success: false, msg: 'Failed to update BDM' });
        Client.getClientsByIds(ids, (err, docs) => {
            redisHelper.setCacheDatabyPattern('client', docs, function () {
                return res.json({ success: true, msg: 'BDM updated for '+ docs.length + ' clients' });
            });
        });
    });
});

// update client
router.post('/', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let clientId = req.body._id;
    let updateClient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company,
        supervisor: req.body.supervisor,
        managementLevel: req.body.managementLevel,
        etouchSl: req.body.etouchSl,
        reminder: req.body.reminder,
        bdm: req.body.bdm,
        status: req.body.status,
        linkedInUrl: req.body.linkedInUrl
    };

    if (updateClient.reminder) updateClient.reminder.date = new Date(updateClient.reminder.date).toISOString();

    Client.updateClient(clientId, updateClient, (err, client) => {
        if (err) res.json({ success: false, msg: 'Failed to update client' });
        Client.getClientById(clientId, (err, doc) => {
            redisHelper.setCacheData('client', doc, function () {
                return res.json({ success: true, msg: 'Updated client data' });
            });
        });
    });
});

//get reminders by assignee and daterange
router.get('/reminders/:assignedto/:startdate/:enddate', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Client.getClientByDateRange(
        req.params.assignedto,
        new Date(req.params.startdate).toISOString(),
        new Date(req.params.enddate).toISOString(),
        function (err, client) {
            if (err) res.json({ success: false, msg: 'Failed to fetch reminders' });
            res.send(JSON.stringify(client));
        });
});

//add new client
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    let newClient = new Client(req.body.newClient);
    Client.addClient(newClient, (err, client) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add client' });
        } else {
            redisHelper.setCacheData('client', client, function () {
                res.json({ success: true, msg: 'Client added', client: client });
            });
        }
    });
});

module.exports = router;