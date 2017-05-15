const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app.config');
const dbConfig = require('../config/database');
const User = require('../models/user');
const redisHelper = require('../helpers/redis.helper');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      if(err.code === 11000) {
        res.json({success: false, msg:'Email already exists'});  
      } else {
        res.json({success: false, msg:'Failed to register user'});
      }
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
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
            _id: user._id,
            name: user.name,
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
  res.json({user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
          }});
});

// Get All Users
router.get('/all', (req, res, next) => {
  redisHelper.getCacheData('all_users', function (data) {
    if (data) {
      res.send(data);
    } else {
      User.getAllUsers('all', (err, users) => {
        if (err) res.json({ success: false, msg: 'Failed to get All Users' });
        else {
          users._id = 'users';
          redisHelper.setCacheData('all', users, function () {
          });
          res.send(JSON.stringify(users));
        }
      });
    }
  });
});

// Get All BDMs
router.get('/bdm', (req, res, next) => {
  redisHelper.getCacheData('bdm_users', function (data) {
    if (data) {
      res.send(data);
    } else {
      User.getAllBdms('bdm', (err, users) => {
        if (err) res.json({ success: false, msg: 'Failed to get BDMs' });
        else {
          users._id = 'users';
          redisHelper.setCacheData('bdm', users, function () {
          });
          res.send(JSON.stringify(users));
        }
      });
    }
  });
});


router.post('/profile', (req, res, next) => {
    const userId =  req.body._id;
    const updateUser= {
        name: req.body.name,
        role: req.body.role
    };

    User.updateUser(userId, updateUser, (err, user) => {
      if (err) res.json({success: false, msg:'Failed to update profile'});
      return res.json({success: true, msg:'Profile updted', user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }});
    });
});

module.exports = router;