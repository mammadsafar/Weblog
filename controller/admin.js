const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');

const {
    // showDashboard,
    users,
    getAllUser,
    deletUser,
    userArticlePage,
    UpdatePass,
    // UpdateUserAvatar,
    // uploadBackgrondAvatar,
} = require("../services/admin");

// router.get('/', generalTools.adminChecker, showDashboard)
router.get('/userArticlePage:id', userArticlePage);
router.get('/users', users);
router.post('/getAllUser', getAllUser);
router.delete('/:id', deletUser);
router.put('/pass:id', UpdatePass);
// router.put('/:username', UpdateUser);
// router.post('/avatar', UpdateUserAvatar);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;