const express = require('express');
const router = express.Router();

const {
    showDashboard,
    getAllUser,
    deletUser,
    UpdateUser,
    UpdatePass,
    UpdateUserAvatar,
    uploadBackgrondAvatar,
} = require("../services/dashboard");

router.get('/', showDashboard)
// router.post('/loggedInUser', loggedInUser);
router.get('/getAllUser', getAllUser);
router.delete('/:username', deletUser);
router.put('/pass:username', UpdatePass);
router.put('/:username', UpdateUser);
router.post('/avatar', UpdateUserAvatar);
router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;