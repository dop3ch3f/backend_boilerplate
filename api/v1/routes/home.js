let express = require('express')
let HomeController = require('../controller/home')
var api = express.Router()

api.get('/', (req,res)=>{
    HomeController.Home(req,res)
})

module.exports = api
