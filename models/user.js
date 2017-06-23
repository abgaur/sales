const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}
module.exports.getUserByEmail = function(email, callback) {
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getAllUsers = function(role, callback){
    User.find({}, 'name email', callback);
};

/*module.exports.getAllBdms = function(role, callback){
    User.find({role},  'name email', callback);
};*/

module.exports.getByRole = function(role, callback){
    User.find({role},  'name email', callback);
};

module.exports.updateUser = function(userId, updateUser, callback){
    User.findByIdAndUpdate(userId, updateUser, {'new': true}, callback);
};