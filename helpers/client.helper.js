/**
 * Contains helper methods for client data
 */
const clientConfig = require('../config/client.config');

module.exports ={
    createDBObjFromExcel: function(inputJSON){
        let newObj={};
        Object.keys(clientConfig).forEach(function(key) {
            let val = clientConfig[key];
            newObj[val] = inputJSON[key];
        });
        return newObj;
    }
};