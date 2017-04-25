const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    displayOrder: Number,
    key: String,
    value: String
});

const Status = mongoose.model('Status', statusSchema, 'statuses');
module.exports = Status;

module.exports.getStatuses = function(callback){
    Status.find({}, callback).sort({'displayOrder':'asc'});
};