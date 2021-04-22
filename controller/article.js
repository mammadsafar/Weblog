const express = require('express');
const router = express.Router();
const generalTools = require('../tools/general-tools');
const {
    newArticle,
    articleprofile,
    articleImage,
    addNewArticle,
    myArticles,
    getMyArticle,
    getOneArticle,
    deleteArticle,
    updateArticlePage,
    updateArticle,
} = require("../services/article");

router.get('/new', newArticle)

router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
router.post('/addNewArticle', addNewArticle);
// router.post('/addText', addText);

router.get('/myArticles', myArticles);

router.post('/getMyArticle', getMyArticle);
router.post('/getOneArticle:id', getOneArticle);

router.delete('/delete:id', deleteArticle);


router.get('/read:id', updateArticlePage);
router.put('/updatePage', updateArticle);
// router.put('/updatePage', generalTools.updateArticleChecker, updateArticle);

module.exports = router;