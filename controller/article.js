const express = require('express');
const router = express.Router();

const {
    newArticle,
    articleprofile,
    articleImage,
    addNewArticle,
    addText,
    myArticles,
    getMyArticle,
} = require("../services/article");

router.get('/new', newArticle)
router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
router.post('/addNewArticle', addNewArticle);
router.post('/addText', addText);
router.get('/myArticles', myArticles);
router.post('/getMyArticle', getMyArticle);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;