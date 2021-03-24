const express = require('express');
const router = express.Router();


const {
    registerPage,
    createUser,
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
router.post('/', createUser);
router.get('/getAllUser', getAllUser);
router.delete('/:username', deletUser);
router.put('/pass:username', UpdatePass);
router.put('/:username', UpdateUser);




module.exports = router;
