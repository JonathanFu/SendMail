var emailCtl = require('../controller/email');

/*
 * routes.js
 */
module.exports = function(app){

  app.get('/', function(req, res, next){
    res.render('index')
  });

  app.post('/sendEmail', emailCtl.send);

};
