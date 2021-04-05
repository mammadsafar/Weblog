const express = require('express');
const router = express.Router();

const {
    newArticle,
    articleprofile,
    articleImage,
    // UpdateUser,
    // UpdatePass,
    // UpdateUserAvatar,
    // uploadBackgrondAvatar,
} = require("../services/article");

router.get('/new', newArticle)
router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
// router.get('/getAllUser', getAllUser);
// router.delete('/:username', deletUser);
// router.put('/pass:username', UpdatePass);
// router.put('/:username', UpdateUser);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;