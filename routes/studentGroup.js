const express = require("express");
const router = express.Router();
const {getAllGroups , createGroup  , updateGroup , getGroupByCoSupervisor , getGroupBySupervisor , getGroupById , deleteGroup } = require('../controller/studentgroup');
const auth = require('../middleware/auth');

router.post('/add', auth , createGroup);
router.get('/', getAllGroups);
router.get('/student', auth , getGroupById);
router.get('/supervisor', auth , getGroupBySupervisor);
router.get('/cosupervisor', auth , getGroupByCoSupervisor);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);


module.exports = router;