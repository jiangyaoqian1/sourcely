'use strict';

var queryHelper   = require('./mongoHelper/queryUsers.js'),
    articleHelper = require('./mongoHelper/queryArticles.js'),
    bcrypt        = require('bcrypt-nodejs'),
    Path          = require('path'),
    http          = require('http'),
    jwt           = require('jwt-simple');


var signupUser = function(req, res){
  queryHelper.findUser(req.body.username)
  .then(function(data){
    if(data){
      res.send(401, "user already exists");
    }else{
      if(req.body.username && req.body.password){
        queryHelper.createUser(req.body.username, req.body.password)
        .then(function(data) {
          res.json(data);
        });
      }
    }
  })
};

var login = function(req, res){
  queryHelper.findUser(req.body.username).then(function(data){
    if(data){
      bcrypt.compare(req.body.password, data[0].passwordHash, function(err, result) {
        if (result) {
          var user = data[0],
              formattedData = {username: req.body.username, userId: user['_id'], authorized: true, tokenDate: Date.now()},
              token = jwt.encode(formattedData, "scott"/*process.env.SECRET*/),
              sendData = {token: token, readArticles: user['readObjects'], username: req.body.username};
          res.json(sendData);
        } else {
          res.send(401, "Incorrect Password");
        }
      })
    }else{
      res.send(401, "User Doesn't Exist");
    }
  })
};

var authenticate = function(req, res) {
  queryHelper.findUserId(req.user.userId).then(function(data){
    if(data){
      var user = data[0],
          formattedData = {username: user['username'], userId: user['_id'], authorized: true, tokenDate: Date.now()},
          token = jwt.encode(formattedData, "scott"),
          sendData = {token: token, readArticles: user['readObjects'], username: user['username']};
      res.json(sendData);
    } else {
      res.send(401, "Auth Failed, invalid user");
    }
  });
};

var markCollectionRead = function(req, res) {
  res.send(true);
  queryHelper.updateUserReadArticles(req.body.clusterId, req.body.username);
};

module.exports = {
  signupUser: signupUser,
  login: login,
  authenticate: authenticate,
  markCollectionRead: markCollectionRead
};
