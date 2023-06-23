const express = require('express');
const router = express.Router();
const newCV = require('../controller/newCV');

router.post('/update-pdf-cv', newCV.updatePDFCV);

module.exports = router;
