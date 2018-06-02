/**
 * Created by tjazz on 30/09/2016.
 */
'use strict';

const request = require('request');

function SMS() {

}

SMS.sendSMS = function (phone, message) {
    phone = reformatNumber(phone);
    let url = 'http://www.betasms.com.ng/api/sms?';
    let doc = {
        username: '',
        password: '',
        from: '',
        to: phone,
        message: message.toString().trim().replace(/\s/g, '+')
    };
    let temp = [];
    for (let key in doc) {
        if (!doc.hasOwnProperty(key)) continue;
        temp.push(key + '=' + doc[key])
    }
    temp = temp.join('&');
    url = url + temp;
    request(url + doc, function (error, response, body) {
        if (error) {
            console.log("error: " + error);
        } else {
            console.log("body: " + body);
        }
    })
};

SMS.sendSMSLive = function (phone, message) {
    phone = reformatNumber(phone);
    let url = 'http://www.smslive247.com/http/index.aspx?';
    let doc = {
        cmd: 'sendquickmsg',
        owneremail: '',
        subacct: '',
        subacctpwd: '',
        message: encodeURIComponent(message),
        sender: '',
        sendto: phone,
        msgtype: 0
    };
    let temp = [];
    for (let key in doc) {
        if (!doc.hasOwnProperty(key)) continue;
        temp.push(key + '=' + doc[key])
    }
    temp = temp.join('&');
    url = url + temp;
    // console.log(url + doc);
    request(url + doc, function (error, response, body) {
        if (error) {
            console.log("error: " + error);
        } else {
            console.log("body: " + body);
        }
    });
};

SMS.sendOnboardingSMS = function () {
    const Teacher = require('../models/Teacher').getInstance();
    Teacher.findAll().then(teachers => {
        //phone = reformatNumber(t.phone);
        let phones = teachers.map(t => t.phone);
        for (let i = 0; i < phones.length; i++) {
            if (!phones[i]) continue;
            setTimeout(function () {
                SMS.sendSMS(phones[i], 'Congrats. ' +
                    'To accept, visit.')
            }, 5000);
        }


    }).catch(e => console.log(e));
};

module.exports = SMS;

function reformatNumber(number) {
    // 08026077040 , 0123346532
    number = number.toString();
    if (number.length === 11 || number[0] === '0') {
        number = number.substr(1, number.length + 1);
        number = '234' + number;
    }
    return number;
}