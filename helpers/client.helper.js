/**
 * Contains helper methods for client data
 */
const clientConfig = require('../config/client.config');
const multer = require('multer');

module.exports.createDBObjFromExcel = function (inputJSON) {
    let newObj = {};
    Object.keys(clientConfig).forEach(function (key) {
        let val = clientConfig[key];
        newObj[val] = inputJSON[key];
    });
    return newObj;
};

module.exports.getUploader = function () {
    const storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            const datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
        }
    });

    const upload = multer({ //multer settings
        storage: storage,
        fileFilter: function (req, file, callback) { //file filter
            if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
                return callback(new Error('Wrong extension type'));
            }
            callback(null, true);
        }
    }).single('file');
    return upload;
};

module.exports.showRoleBasedClients = function (role, clientsList) {
    if (role == "isr") {
        let unassignedClients = clientsList.filter(function (element) {
            return !element.assignedTo;
        });
        return unassignedClients;
    } else {
        return clientsList;
    }
};