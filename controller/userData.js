const express = require('express');
const router = express.Router();

const {
    getUser,
} = require("../services/userData");

router.get('/getUser', getUser)
// router.post('/loggedInUser', loggedInUser);

module.exports = router;