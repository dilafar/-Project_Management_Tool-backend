const express = require("express");
const router = express.Router();
const {signin , signup ,staffsignup} = require('../controller/user');

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/staffsignup', staffsignup);

module.exports = router;