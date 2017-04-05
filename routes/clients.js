const express = require('express');
const router = express.Router();
const config = require('../config/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const Client = require('../models/client');
const clientHelper = require('../helpers/client.helper');
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');


// Upload
router.post('/upload:username', (req, res, next) => {
  let uploadedBy = req.params.username;
  let exceltojson;
  upload(req,res,function(err){
      if(err){
            res.json({error_code:1,err_desc:err});
            return;
      }
      /** Multer gives us file info in req.file object */
      if(!req.file){
          res.json({error_code:1,err_desc:"No file passed"});
          return;
      }
      /** Check the extension of the incoming file and 
       *  use the appropriate module
       */
      if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
          exceltojson = xlsxtojson;
      } else {
          exceltojson = xlstojson;
      }
      
      try {
          exceltojson({
              input: req.file.path,
              output: null, //since we don't need output.json
              lowerCaseHeaders:true
          }, function(err,result){
              if(err) {
                  return res.json({error_code:1,err_desc:err, data: null});
              } 
              
              // extra code
              //console.log(result);
            
              for(let i=0; i<result.length; i++){
                  result[i].uploadedBy = uploadedBy;
                  let newClient = Client(clientHelper.createDBObjFromExcel(result[i]));
                  let newId = newClient.save(function (err) {
                      if (err) {
                          console.log(err);
                      } else {
                          // console.log(JSON.stringify(newClient));
                      }
                  });
              }
              //console.log('===== SUCCESS ===== ' + result.length+ ' records added');
              //res.json({error_code:0,err_desc:null, data: result.length+ ' records added'});
              //res.send('<h1>' +result.length+ ' records added</h1>');
              return res.json({success: true, msg: 'Records Added'});
          });
      } catch (e){
          return res.json({success: false, msg: 'Records not Added'});
      }
  });
});

// fetch data by uploader name
router.get('/data/:uploadedBy', (req, res, next) => {
     Client.find({uploadedBy: req.params.uploadedBy}, function(err, client) {
          if (err) return console.error(err);
          //console.log(client);
            res.send(JSON.stringify(client));
        });
});

// fetch cached data by uploader name
router.get('/cachedata/:uploadedBy', (req, res, next) => {
    let uploadedBy = req.params.uploadedBy;
    var sendDate = (new Date()).getTime();
     redis.get(uploadedBy, function (err, reply) {
        if (err) return console.error(err);
        else if (reply){ //Client exists in cache
            console.log('picked up from cache');
            res.send(JSON.parse(reply));
            var receiveCacheDate = (new Date()).getTime();
            var cacheResponseTimeMs = receiveCacheDate - sendDate;
            console.log('cache hit === ', cacheResponseTimeMs + " ms");    
        }
        else {
        Client.find({uploadedBy: uploadedBy}, function(err, client) {
            if (err) return console.error(err);
            else{
                console.log('coming first time');
                redis.set(uploadedBy, JSON.stringify(client), function () {
                       res.send(JSON.stringify(client));
                       var receiveDate = (new Date()).getTime();
                        var responseTimeMs = receiveDate - sendDate;
                        console.log('db hit === ', responseTimeMs + " ms");                   
                });
            }     
        });
        }
    });
});

// fetch data by uploader name
router.post('/assignto/', (req, res, next) => {
    const assignTo = req.body.assignTo;
    const ids = req.body.ids;

    console.log(ids);

     Client.update(
         { _id: { $in: ids } },
         { multi: true},
         { $set: { firstName : assignTo }
     });     

      return res.json({success: true, msg: 'Assigned'});
});

module.exports = router;  