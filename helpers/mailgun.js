/**
 * Created by tjazz on 2/21/16.
 */
"use strict";
var swig = require('swig');
var path = require('path');

function Mailgun() {
    var api_key = '';
    var domain = '';
    this.mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

}



Mailgun.prototype.sendNibssEmail = function (successCount, errorCount, errorRecords) {
    var template = swig.compileFile(path.join(__dirname, '../', '../emailTemplates/verified.html'));
    var output = template({
        'successCount': successCount,
        'errorCount': errorCount,
        'errorRecords': errorRecords
    });

    var data = {
        from: '',
        to: ['test@test.ng'],
        subject: '',
        text: output,
        html: output
    };

    this.mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};

Mailgun.prototype.sendPaymentEmail = function (successCount, errorCount, errorRecords) {
    var template = swig.compileFile(path.join(__dirname, '../', '../emailTemplates/notification.html'));
    var output = template({
        'successCount': successCount,
        'errorCount': errorCount,
        'errorRecords': errorRecords
    });

    var data = {
        from: '',
        to: ['any@any.com'],
        subject: '',
        text: output,
        html: output
    };

    this.mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};

Mailgun.prototype.sendNotVerifiedAbsentEmail = (successCount, errorCount, errorRecords) => {
    var template = swig.compileFile(path.join(__dirname, '../', '../emailTemplates/notVerifiedAbsent.html'));
    var output = template({
        'successCount': successCount,
        'errorCount': errorCount,
        'errorRecords': errorRecords
    });

    var data = {
        from: '',
        to: ['any@any.com'],
        subject: '',
        text: output,
        html: output
    };

    this.mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};

Mailgun.prototype.sendErrorMail = function (title, error, host, agent, body) {
    var template = swig.compileFile(path.join(__dirname, '../', '../emailTemplates/error.html'));
    var output = template({
        'error': error,
        'host': host,
        'userAgent': agent,
        'requestBody': body
    });

    var data = {
        from: '',
        to: ['test@test.com'],
        subject: 'Error 500',
        text: output,
        html: output
    };

    this.mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
};

Mailgun.sendNotification = function (successCount, errorCount, errorRecords) {
    const email = new Mailgun();
    email.sendNibssEmail(successCount, errorCount, errorRecords);
};

Mailgun.notifyNotVerifiedAbsent = (successCount, errorCount, errorRecords) => {
    const email = new Mailgun();
    email.sendNotVerifiedAbsentEmail(successCount, errorCount, errorRecords);
};

Mailgun.sendPayment = function (successCount, errorCount, errorRecords) {
    const email = new Mailgun();
    email.sendPaymentEmail(successCount, errorCount, errorRecords);
};

Mailgun.sendErrorLog = function (title, error, host, agent, body) {
    const email = new Mailgun();
    email.sendErrorMail(title, error, host, agent, body);
};

module.exports = Mailgun;

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
