const express = require('express');
const router = express.Router();

const {
    newArticle,
    articleprofile,
    articleImage,
    addNewArticle,
    addText,
    // UpdateUserAvatar,
    // uploadBackgrondAvatar,
} = require("../services/article");

router.get('/new', newArticle)
router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
router.post('/addtitle', addNewArticle);
router.post('/addText', addText);
// router.put('/pass:username', UpdatePass);
// router.put('/:username', UpdateUser);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;