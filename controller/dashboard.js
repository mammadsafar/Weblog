const express = require('express');
const router = express.Router();

const {
    showDashboard,
} = require("../services/dashboard");

router.get('/', showDashboard)
// router.post('/loggedInUser', loggedInUser);

module.exports = router;