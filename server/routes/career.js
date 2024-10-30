const express = require('express');
const router = express.Router();
const {getGuidance} = require("../controllers/career")

router.post('/guidance',getGuidance);

module.exports = router;
