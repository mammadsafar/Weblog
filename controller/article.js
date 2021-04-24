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
    readArticle,
} = require("../services/article");

// todo -------------< show article >-------------
router.get('/new', newArticle)
router.get('/readArticle:id', readArticle)
router.get('/read:id', updateArticlePage);



// todo -------------< create article >-------------
router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
router.post('/addNewArticle', addNewArticle);
// router.post('/addText', addText);

// todo -------------< my article article >-------------
router.get('/myArticles', myArticles);

// todo -------------< edit article >-------------
router.put('/updatePage', updateArticle);

// todo -------------< get article >-------------
router.post('/getMyArticle', getMyArticle);
router.get('/getOneArticle:id', getOneArticle);

// todo -------------< delete article >-------------
router.delete('/delete:id', deleteArticle);


// router.put('/updatePage', generalTools.updateArticleChecker, updateArticle);

module.exports = router;