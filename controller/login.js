const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const {
    loginPage,
    loggedInUser,
} = require("../services/login");

router.get('/', loginPage)
router.post('/loggedInUser',  generalTools.sessionChecker, loggedInUser);

module.exports = router;