'use strict';

var helpers        = require('./helpers');
var usersHelpers   = require('./usersHelpers');

module.exports = function(app){
  app.get('/articles', helpers.sendTechArticles);
  app.get('/welcome', helpers.sendWelcome);
  app.post('/signup', usersHelpers.signupUser);
  app.post('/login', usersHelpers.login);
  app.post('/api/authenticate', usersHelpers.authenticate);
  app.post('/markread', usersHelpers.markCollectionRead);
  app.get('*', helpers.sendLandingPage);
};
