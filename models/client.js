// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var clientSchema = new Schema({
  'uploaded': String,
  'rainKingContactId': String,
  'salutation': String,
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
  'twitterUrl': String
});

// the schema is useless so far
// we need to create a model using it
var Client = mongoose.model('Client', clientSchema);

// make this available to our clients in our Node applications
module.exports = Client;