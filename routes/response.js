const express = require("express");
const router = express.Router();
const {createResponse , deleteResponse , getAllResponse ,getResponseByID } = require('../controller/ResponseController');
const auth = require('../middleware/auth');

router.post('/add', auth , createResponse);
router.get('/', getAllResponse);
router.get('/find', auth , getResponseByID);
router.delete('/:id', deleteResponse);


module.exports = router;