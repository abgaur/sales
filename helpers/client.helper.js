/**
 * Contains helper methods for client data
 */
var clientConfig = require('../config/client.config');

module.exports ={
    createDBObjFromExcel: function(inputJSON){
        var newObj={};
        Object.keys(clientConfig).forEach(function(key) {
            var val = clientConfig[key];
            newObj[val] = inputJSON[key];
        });
        return newObj;
    }
};