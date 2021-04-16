const express = require('express');
const router = express.Router();

const {
  allArticle,
    getAllArticle,
    // articleImage,
    // addNewArticle,
    // addText,
    // myArticles,
    // getMyArticle,
} = require("../services/public");

router.get('/allArticle', allArticle)
router.post('/getAllArticle', getAllArticle);
// router.post('/articleImage', articleImage);
// router.post('/addNewArticle', addNewArticle);
// router.post('/addText', addText);
// router.get('/myArticles', myArticles);
// router.post('/getMyArticle', getMyArticle);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;