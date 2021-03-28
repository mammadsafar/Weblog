const express = require('express');
const router = express.Router();

const {
    showDashboard,
    getAllUser,
    deletUser,
    UpdateUser,
    UpdatePass,
} = require("../services/dashboard");

router.get('/', showDashboard)
// router.post('/loggedInUser', loggedInUser);
router.get('/getAllUser', getAllUser);
router.delete('/:username', deletUser);
router.put('/pass:username', UpdatePass);
router.put('/:username', UpdateUser);

module.exports = router;