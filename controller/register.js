const express = require('express');
const router = express.Router();


const {
    registerPage,
    createUser,

} = require("../services/Register");


router.post('/createUser', function(req, res, next) {
  res.send('respond with a resource');
});



console.log(123432);
router.get('/', registerPage);
router.post('/', createUser);





module.exports = router;
