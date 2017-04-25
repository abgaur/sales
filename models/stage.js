const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stageSchema = new Schema({
    displayOrder: Number,
    key: String,
    value: String
});

const Stage = mongoose.model('Stage', stageSchema);
module.exports = Stage;

module.exports.getStages = function(callback){
    Stage.find({}, callback).sort({'displayOrder':'asc'});
};