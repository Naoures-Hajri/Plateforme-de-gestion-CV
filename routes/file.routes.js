const express = require('express');
const fileController = require('../controller/uploadFile');

const router = express.Router();

// Route pour recevoir le fichier
router.post('/receiveFile', fileController.receiveFile, (req, res) => {
  console.log('File received:', req.file);
  // Traitez le fichier téléchargé comme nécessaire
  res.status(200).send('File received successfully');
});

module.exports = router;
