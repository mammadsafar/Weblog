const express = require('express');
const router = express.Router();
const register = require('../controller/register')
// const home = require('')
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.use('/', (req, res)=>{
  res.render('home')
});
router.use('/home', (req, res)=>{
  res.render('home')
});
router.use('/about', (req, res)=>{
  res.render('about')
});


// ? ---------------------------------< Use Register >---------------------------- 
router.use('/register', register);


module.exports = router;
