// JWT
// 1 SIGN DATA
// 2 VERIFY
const jwt = require('jsonwebtoken')
const express = require('express')
const route = express.Router()
const _ = require('lodash')

// Verify Token
route.use((req, res, next) => {

  jwt.verify(req.headers['x-access-toke'], process.env.Secret, (err, decoded) => {
    // decode and verify

  })
})

module.exports = route
