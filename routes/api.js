const express = require('express');
const router = express.Router();
const register = require('../controller/register')
const login = require('../controller/login')
const logout = require('../controller/logout');
const userData = require('../controller/userData');
const dashboard = require('../controller/dashboard');
const article = require('../controller/article');
const public = require('../controller/public');
const generalTools = require('../tools/general-tools');


// ? ---------------------------------< Register >---------------------------- 
router.use('/register', register);
// ? ---------------------------------< Login >---------------------------- 
router.use('/login', login);
// ? ---------------------------------< Logout >---------------------------- 
router.use('/logout', logout);
// ? ---------------------------------< Dashboard >---------------------------- 
router.use('/dashboard', generalTools.loginChecker, dashboard);
// ? ---------------------------------< ger data user >---------------------------- 
router.use('/userData', userData);
// ? ---------------------------------< article >---------------------------- 
router.use('/article', generalTools.loginChecker, article);
// router.use('/article', article);
// ? ---------------------------------< All article >---------------------------- 
router.use('/all', public);


router.get('/', (req, res) => {
  res.render('home')
});
router.get('/home', (req, res) => {
  res.render('home')
});
router.get('/about', (req, res) => {
  res.render('about')
});
router.get('/contact', (req, res) => {
  res.render('article/newArticle')
});




module.exports = router;