const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of scraped DB"
const { verifyToken } = require("../Middlewares/verify_token");
const accessUser = require('../Middlewares/allowed_to');
const userRoles = require('../Utilites/user_roles')
const scrapedDBControllers = require('../Controllers/Scraped DB Controller/scrapedDB_controller')


router.post('/scrapedDB' , scrapedDBControllers.get_scraped_fromDB);

module.exports = router
