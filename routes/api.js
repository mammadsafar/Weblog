const express = require('express');
const router = express.Router();
const register = require('../controller/register')
const login = require('../controller/login')
const logout = require('../controller/logout');
const userData = require('../controller/userData');
const dashboard = require('../controller/dashboard');
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

router.use('/', (req, res)=>{
  res.render('home')
});
router.use('/home', (req, res)=>{
  res.render('home')
});
router.use('/about', (req, res)=>{
  res.render('about')
});
router.use('/contact', (req, res)=>{
  res.render('contactUs')
});




module.exports = router;
