const express = require('express');
const router = express.Router();

const {
  allArticle,
  getAllArticle,
  readArticle,
  getOneArticle,
  // myArticles,
  // getMyArticle,
} = require("../services/public");

router.get('/allArticle', allArticle)
router.post('/getAllArticle', getAllArticle);
router.get('/readArticle:id', readArticle)
router.get('/getOneArticle:id', getOneArticle);

// router.post('/articleImage', articleImage);
// router.post('/addNewArticle', addNewArticle);
// router.post('/addText', addText);
// router.get('/myArticles', myArticles);
// router.post('/getMyArticle', getMyArticle);
// router.post('/background_cover', uploadBackgrondAvatar);
module.exports = router;