const express = require("express");
const router = express.Router();
const {signin , signup ,staffsignup ,  getAllStaff , getAllUser , deleteStaffUser , deleteUser , updateStaffUser,  updateUser, getAllStaffUsers,updatepanel,getStaffById} = require('../controller/user');

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/staffsignup', staffsignup);
router.get('/staff', getAllStaff);
router.get('/student', getAllUser);
router.get('/',getAllStaffUsers);
router.get('/:id',getStaffById);
router.delete('/staff/:id', deleteStaffUser);
router.delete('/student/:id', deleteUser);
router.put('/staff/:id', updateStaffUser);
router.put('/student/:id', updateUser);
router.put('/panel/:id', updatepanel);

module.exports = router;