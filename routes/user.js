const express = require("express");
const router = express.Router();
const {signin , signup ,staffsignup ,  getAllStaff , getAllUser , deleteStaffUser , deleteUser} = require('../controller/user');

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/staffsignup', staffsignup);
router.get('/staff', getAllStaff);
router.get('/student', getAllUser);
router.delete('/staff/:id', deleteStaffUser);
router.delete('/student/:id', deleteUser);


module.exports = router;