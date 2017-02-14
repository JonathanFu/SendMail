var SENDGRID = require('../config/config').SENDGRID;

exports.send = function (data, callback) {
    var helper = require('sendgrid').mail;
    var mail = new helper.Mail();
    var emailFrom = new helper.Email(data.emailFrom);
    mail.setFrom(emailFrom);
    mail.setSubject(data.subject);

    var personalization = new helper.Personalization();
    personalization.addTo(new helper.Email(data.to));
    personalization.addCc(new helper.Email(data.cc));
    personalization.addBcc(new helper.Email(data.bacc));

    mail.addPersonalization(personalization);
    mail.addContent(new helper.Content("text/plain",data.text));

    mail.setReplyTo(data.emailFrom);

    _send(mail.toJSON(), callback);
};

function _send(data, callback){

    var sg = require('sendgrid')(SENDGRID.API_KEY);

    var requestBody = data;
    var emptyRequest = require('sendgrid-rest').request;
    var requestPost = JSON.parse(JSON.stringify(emptyRequest));
    requestPost.method = 'POST';
    requestPost.path = SENDGRID.PATH;
    requestPost.body = requestBody;
    sg.API(requestPost, function (error, response) {
        callback(error, response);
    })
}