
var MAILGUN = require('../config/config').MAILGUN;

exports.send = function (data, callback) {
    var mailgun = require('mailgun-js')({apiKey: MAILGUN.API_KEY, domain: MAILGUN.DOMAIN});

    var data = {
        from: data.emailFrom,
        to: data.to,
        cc: data.cc,
        bcc: data.bcc,
        subject: data.subject,
        text: data.text
    };

    mailgun.messages().send(data, function (error, body) {
        callback(error, body);
    });
};