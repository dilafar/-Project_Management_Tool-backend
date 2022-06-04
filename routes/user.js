const express = require("express");
const router = express.Router();
const {signin , signup ,staffsignup , updateStudent, getAllStaff , getAllUser , deleteStaffUser , deleteUser , updateStaffUser,  updateUser, getAllStaffUsers,updatepanel,getStaffById , getStudentById} = require('../controller/user');

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/staffsignup', staffsignup);
router.get('/staff', getAllStaff);
router.get('/student', getAllUser);
router.get('/',getAllStaffUsers);
router.get('/:id',getStaffById);
router.get('/new/:id', getStudentById);
router.delete('/staff/:id', deleteStaffUser);
router.delete('/student/:id', deleteUser);
router.put('/staff/:id', updateStaffUser);
router.put('/student/:id', updateUser);
router.put('/panel/:id', updatepanel);
router.put('/StudentProfile/:id', updateStudent);

module.exports = router;