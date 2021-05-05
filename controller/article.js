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
    addComment,
    deleteComment,
} = require("../services/article");

// todo -------------< show article >-------------
router.get('/new', newArticle)
router.get('/readArticle:id', readArticle)




// todo -------------< create article >-------------
router.post('/articleprofile', articleprofile);
router.post('/articleImage', articleImage);
router.post('/addNewArticle', addNewArticle);
// router.post('/addText', addText);

// todo -------------< my article article >-------------
router.get('/myArticles', myArticles);

// todo -------------< edit article >-------------
router.get('/edit:id', updateArticlePage);
router.put('/editArticle', updateArticle);

// todo -------------< get article >-------------
router.post('/getMyArticle', getMyArticle);
router.get('/getOneArticle:id', getOneArticle);

// todo -------------< delete article >-------------
router.delete('/delete:id', deleteArticle);

// todo -------------< Comment >-------------
router.post('/addComment:id', addComment);
router.get('/deleteComment:id', deleteComment);

// router.put('/updatePage', generalTools.updateArticleChecker, updateArticle);

module.exports = router;