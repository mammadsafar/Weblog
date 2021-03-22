const express = require('express');
const router = express.Router();


const {
    registerPage,
    addUser,
    getAllUser,
    deletUser,
    UpdateUser,
    UpdatePass,
} = require("../services/Register");


router.post('/createUser', function(req, res, next) {
  res.send('respond with a resource');
});



console.log(123432);
router.get('/', registerPage);
router.post('/', addUser);
router.get('/getAllUser', getAllUser);
router.delete('/:userName', deletUser);
router.put('/pass:userName', UpdatePass);
router.put('/:userName', UpdateUser);




module.exports = router;
