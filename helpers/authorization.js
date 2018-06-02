/**
 * Created by tjazz on 18/09/2016.
 */
'use strict';
// const redis =  require('../config/database').redis()
const fs = require('fs');
const path = require('path');



exports.authorize = function (req, res) {
    return new Promise((resolve, reject) => {
        let cert;
        redis.get('tndn::authCert', (err, cert) => {
            if (!cert) {
                cert = fs.readFileSync(path.join(__dirname, '../cpc-cert.pem'));
                redis.set('tndn::authCert', cert);
            }
            var jwt = require('jsonwebtoken');

            jwt.verify(req.header('Authorization').toString().split(' ')[1], cert, { algorithms: ['RS256'] },function(err, decoded) {
                if (err) {
                    return reject(err);
                } else {
                    // decoded = JSON.parse(JSON.stringify(decoded));
                    redis.get('tndn::authKey', (err, key) => {
                        if (!key) {
                            key = fs.readFileSync(path.join(__dirname, '../cpc-key.pem'));
                            redis.set('tndn::authKey', key);
                        }
                        res.token = jwt.sign({type: decoded.type, email_address: decoded.email_address, id: decoded.id}, key, { algorithm: 'RS256', expiresIn: '1d'});
                        return resolve(decoded);
                    })
                }
            });
        });
    });

};

exports.hashKey = function (value) {
    const crypto = require('crypto');
    return crypto.createHmac('sha256', '7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e').update(value).digest('hex');
};

exports.comparekey = function (value, key) {
    const crypto = require('crypto');
    return key === crypto.createHmac('sha256', '7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e').update(value).digest('hex');
};