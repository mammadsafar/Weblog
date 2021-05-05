const express = require('express');
const router = express.Router();

const {
    getUser,
    getUserById,
    getComment,
} = require("../services/userData");

router.get('/getUser', getUser)
router.post('/get:id', getUserById)
router.get('/getComment:id', getComment)
// router.post('/loggedInUser', loggedInUser);

module.exports = router;