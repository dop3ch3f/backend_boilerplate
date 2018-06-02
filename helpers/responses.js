'use strict';

// const log = require('../../logger');
// const Email = require('../helpers/mailgun');
const stringify = require('json-stringify-safe');

const httpStatus = require('http-status');

exports.handle400 = function(res, e){
    if(e !== undefined){
        return res.status(httpStatus.BAD_REQUEST).json({message: e});
    } else {
        return res.status(httpStatus.BAD_REQUEST).json({message: 'Invalid Parameters'});
    }
};


exports.handle401 = function(res, msg){
    return res.status(httpStatus.UNAUTHORIZED).json({message: msg});
};

exports.handle404 = function(res){
    return res.status(httpStatus.NOT_FOUND).json({message: "Resource Not Found"});
};

exports.handle403 = function(res, e){

    return res.status(httpStatus.FORBIDDEN).json(e);
};

exports.handle500 = function(req, res, e){
    let host = req.headers.host + req.originalUrl;
    let userAgent = req.headers['user-agent']; console.log(e);
    log.error(e); Email.sendErrorLog('Error 500', JSON.stringify(e), host, userAgent, stringify(req.body));
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Sorry, Error in completing your request"});
};



exports.handle200 = function(res, header = {}, data){
    let accessHeader = [];
    for (let key in header) {
        res.set(key, header[key]);
        accessHeader.push(key);
    }
    res.set('token', res.token);
    accessHeader.push('token');

    res.set('Access-Control-Expose-Headers', accessHeader.join(','));

    return res.status(httpStatus.OK).json(data);
};


exports.handle201 = (res, header = {}, data) => {
    let accessHeader = [];
    for (let key in header) {
        res.set(key, header[key]);
        accessHeader.push(key);
    }
    res.set('token', res.token);
    accessHeader.push('token');

    res.set('Access-Control-Expose-Headers', accessHeader.join(','));

    return res.status(httpStatus.CREATED).json(data);
};


exports.handle204 = (res, header = {}, data) => {
    let accessHeader = [];
    for (let key in header) {
        res.set(key, header[key]);
        accessHeader.push(key);
    }
    res.set('token', res.token);
    accessHeader.push('token');

    res.set('Access-Control-Expose-Headers', accessHeader.join(','));

    return res.status(httpStatus.NO_CONTENT).json(data);
};


exports.send = (res, status, data, header) => {
    let accessHeader = [];

    if (header) {
        for (let key in header) {
            if (header.hasOwnProperty(key)) {
                res.set(key, header[key]);
                accessHeader.push(key);
            }
        }
    }

    if (data instanceof Error) {
        let errData = {
            message: data.message
        };
        if (data.code) {
            errData.code = data.code;
        }
        return res.status(status).send(errData);

    } else {
        res.set('token', res.token);
        accessHeader.push('token');
        res.set('Access-Control-Expose-Headers', accessHeader.join(','));
        return res.status(status).send(data);
    }
};