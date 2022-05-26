const express = require("express");
const router = express.Router();
const {createRequest , deleteRequest ,getRequestByID} = require('../controller/RequestController');
const auth = require('../middleware/auth');

router.post('/add', auth , createRequest);
//router.get('/', getAllRequest);
router.get('/find', auth , getRequestByID);
router.delete('/:id', deleteRequest);



module.exports = router;