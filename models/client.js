var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var clientSchema = new Schema({
  'rainKingContactId': String,
  'salutation': { type: String, default: "" },
  'firstName': String,
  'lastName': String,
  'nickname': String,
  'etouchSl': String,
  'title': String,
  'managementLevel': String,
  'email': String,
  'address1': String,
  'address2': String,
  'city': String,
  'state': String,
  'zip': String,
  'country': String,
  'phone': String,
  'extension': String,
  'supervisor': String,
  'fax': String,
  'hasGatekeeper': String,
  'executive': String,
  'rainKingCompanyId': String,
  'company': String,
  'website': String,
  'sector': String,
  'industry': String,
  'duns': String,
  'allEmployees': String,
  'itEmployees': String,
  'managers': String,
  'revenue': String,
  'itBudget': String,
  'fiscalYearEnd': String,
  'rank': String,
  'lastUpdatedDate': String,
  'notes': String,
  'tags': String,
  'status': String,
  'linkedInUrl': String,
  'twitterUrl': String,
  'uploadedBy': String,
  'assignedTo': String,
  'reminder': {date :Date, text: String},
  'bdm': {name: String, email: String },
  'status': String,
  'switchboard': String
},{timestamps: true});

// the schema is useless so far
// we need to create a model using it
var Client = mongoose.model('Client', clientSchema);

// make this available to our clients in our Node applications
module.exports = Client;

module.exports.addClient = function(newClient, callback){
  newClient.save(callback);
};

module.exports.getClientById = function(clientId, callback){
    Client.findById(clientId, callback);
};

module.exports.getClientByAssignTo = function(assignto, callback){
    Client.find({assignedTo: assignto}, callback);
};

module.exports.updateAssignedTo = function(clientIds, assignTo, callback){
    Client.update(
        { _id: { "$in": clientIds } },
        {assignedTo : assignTo},
        {multi:true},
        callback);
};

module.exports.updateBdm = function(clientIds, bdm, callback){
     Client.update(
        { _id: { "$in": clientIds } },
        {bdm : bdm},
        {multi:true},
        callback);
};

module.exports.getClientsByIds = function(clientIds, callback){
    Client.find({ _id: { "$in": clientIds }}, callback);
};

module.exports.updateClient = function(clientId, updateClient, callback){
    Client.findByIdAndUpdate(clientId, updateClient, callback);
};

module.exports.getClientByDateRange = function(assignedTo, startDate, endDate, callback){
  Client.find({
        "assignedTo" : assignedTo,
        "reminder.date" : {
                            $gte: startDate,
                            $lte: endDate
                        }
        }, callback).sort({"reminder.date" : 'asc'});
};

module.exports.deleteClient = function(clientIds, callback){
    Client.remove({ _id: { "$in": clientIds }}, callback);
};