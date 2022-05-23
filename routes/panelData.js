const express = require("express");
const router = express.Router();
const {createPanel , updatePanel , deletePanel , getAllPanels} = require('../controller/panelData');

router.post('/add', createPanel);
router.get('/', getAllPanels);
router.delete('/:id', deletePanel);
router.put('/:id', updatePanel);

module.exports = router;