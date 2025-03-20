const express = require('express');
const router = express.Router();
const { getaccesscode, addaccesscode, deleteaccesscode } = require('../smmcotroller/accesscodecontroller'); // Fixed typo in folder name and variable naming
router.get('/code',getaccesscode);
router.post('/addacesscode', addaccesscode);
router.delete('/deleteaccesscode/:id', deleteaccesscode);
module.exports = router;
