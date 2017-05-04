const express = require('express');
const router = express.Router();
const config = require('../config/database');
const bodyParser = require('body-parser');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const Client = require('../models/client');
const clientHelper = require('../helpers/client.helper');
const redisHelper = require('../helpers/redis.helper');

// Upload
router.post('/upload/:username', (req, res, next) => {
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
                return res.json({ success: true, msg: 'Records Added' });
            });
        } catch (e) {
            return res.json({ success: false, msg: 'Records not Added' });
        }
    });
});

// fetch data by uploader name
/*router.get('/data/:uploadedBy', (req, res, next) => {
     Client.find({uploadedBy: req.params.uploadedBy}, function(err, client) {
          if (err) return console.error(err);
          //console.log(client);
            res.send(JSON.stringify(client));
        });
});*/

// fetch cached data
router.get('/data', (req, res, next) => {
    //let uploadedBy = req.params.uploadedBy;
    redisHelper.getCacheDatabyPattern('client', function (data) {
        if (data) {
            console.log('picked up from cache');
            res.send(data);
        } else {
            Client.find({}, function (err, client) {
                if (err) return console.error(err);
                else {
                    console.log('coming first time');
                    redisHelper.setCacheDatabyPattern('client', client, function () {
                        console.log('set data in cache');
                    });
                    res.send(JSON.stringify(client));
                }
            });
        }
    });
});

// fetch data by id
router.get('/:id', (req, res, next) => {
    Client.getClientById(req.params.id, (err, client) => {
        if (err) res.json({ success: false, msg: 'Failed to retrieve client' });
        res.send(JSON.stringify(client));

    });
});

// fetch data by assignTo
router.get('/assignto/:assignto', (req, res, next) => {
    Client.getClientByAssignTo(req.params.assignto, (err, client) => {
        if (err) res.json({ success: false, msg: 'Failed to retrieve client' });
        res.send(JSON.stringify(client));
    });
});

// multi-update assingnto
router.post('/assignto', (req, res, next) => {
    let assignTo = req.body.assignTo;
    let ids = req.body.ids;
    Client.updateAssignedTo(ids, assignTo, (err, docs) => {
        if (err) res.json({ success: false, msg: 'Failed to update assignee' });
        console.log('updated records === ', docs.nModified);
        Client.getClientsByIds(ids, (err, docs) => {
            redisHelper.setCacheDatabyPattern('client', docs, function () {
                console.log('set data in cache');
                return res.json({ success: true, msg: docs.nModified + ' clients assigned' });
            });
        });
    });
});

// update client
router.post('/', (req, res, next) => {
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
        status: req.body.status
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
router.get('/reminders/:assignedto/:startdate/:enddate', (req, res, next) => {
    Client.getClientByDateRange(
        req.params.assignedto,
        new Date(req.params.startdate).toISOString(),
        new Date(req.params.enddate).toISOString(),
        function (err, client) {
            if (err) res.json({ success: false, msg: 'Failed to fetch reminders' });
            res.send(JSON.stringify(client));
        });
});

module.exports = router;