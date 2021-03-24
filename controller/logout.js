const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const {
    logout
} = require("../services/Logout");

router.get('/',generalTools.loginChecker, logout)


module.exports = router;