const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const dbConfig = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, dbConfig.secret, {
          expiresIn: appConfig.jwtTimeout
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

// Get All Users
router.get('/all', (req, res, next) => {
   User.find({}, 'name email', function(err, users) {
      if (err) return console.error(err);
       // console.log(users);
        res.send(JSON.stringify(users));
    });
});

// Get All BDMs
router.get('/bdm', (req, res, next) => {


  User.findBdms('bdm', (err, users) => {
      
      if (err) res.json({success: false, msg:'Failed to get BDMs'});
      res.send(JSON.stringify(users));
    });
});



module.exports = router;
