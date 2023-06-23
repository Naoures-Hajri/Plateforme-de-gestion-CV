const multer = require('multer');

// Set up multer storage and options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'templates/'); // Specify the destination directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for saving the file
  }
});

const upload = multer({ storage: storage });

exports.receiveFile = upload.single('file');
