const express = require('express');
const router = express.Router();


const {
    registerPage,
    createUser,
    createAdmin

} = require("../services/register");






console.log(123432);
router.get('/', registerPage);
router.post('/', createUser);
router.post('/createAdmin', createAdmin);





module.exports = router;
