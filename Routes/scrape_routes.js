const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of scrapping"

// Require modules
const scrapeConrollersSTP = require('../Controllers/Scraping Controllers/scrapeStreetPolitics_controller')
const scrapeConrollersINV = require('../Controllers/Scraping Controllers/scrapeINVEST_controller')
const scrapeConrollersMYTH = require('../Controllers/Scraping Controllers/scrapeMyth_controller')

// router.get('/cbc/scrapeall', scrapeConrollersSTP.cbcScrapeAll);
// router.get('/thestar/scrapeall', scrapeConrollersSTP.thestarScrapeAll);
router.get('/collect/streetPoliticsCanada', scrapeConrollersSTP.Collect);

//////////////
router.get('/collect/investocracy/NVDA' , scrapeConrollersINV.CollectNvda)
router.get('/collect/investocracy/AAPL' , scrapeConrollersINV.CollectApple)
router.get('/collect/investocracy/AMD'  , scrapeConrollersINV.CollectAmd)
router.get('/collect/investocracy/AMZN'  , scrapeConrollersINV.CollectAmzn)
router.get('/collect/investocracy/PLTR'  , scrapeConrollersINV.CollectPltr)
router.get('/collect/investocracy/TSLA'  , scrapeConrollersINV.CollectTsla)
//////////////

/////////////
router.get('/collect/twitter/NVDA' , scrapeConrollersINV.CollectTwitter)
router.get('/collect/twitter/PLTR' , scrapeConrollersINV.CollectTwitter)
////////////
router.get('/collectFool/investocracy', scrapeConrollersINV.CollectFool);

/////////////

router.get('/collectInvesting/investocracy', scrapeConrollersINV.CollectInvesting);

////////------Myth---------///////////
router.get('/collect/MYTH', scrapeConrollersMYTH.Collect);

module.exports = router;
module.exports.msg = msg