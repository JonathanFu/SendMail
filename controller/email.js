var mailgunHandler = require('../services/mailgun');
var sendgridHandler = require('../services/sendgrid');

exports.send = function (req, res, next) {

    var data = req.body;
    data.text = getMailBody(data);
    data.emailFrom = 'TestUser@gmail.com';

    mailgunHandler.send(data,function (err, body) {

        if(!err) return res.json(body);

        sendgridHandler.send(data, function (err, data) {
            if(err) return res.json({error: err});
            return res.json(data)
        });
    });


};

var getMailBody = function (data) {
  return 'Hi ' + data.first_name + ' ' + data.last_name + '¥n¥n' + data.message + '¥n¥nRegards,¥nJonathan';
};