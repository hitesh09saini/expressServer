const multer = require('multer');
const path = require('path');

// Function to create multer middleware for a specific upload path
const createMulter = (uploadPath) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath); // Use the specified upload path
    },
    filename: function (req, file, cb) {
      // Rename the file with the current date and original file extension
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

  // Filter to allow only image files
  const fileFilter = function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only image files are allowed'), false); // Reject the file
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });
};

module.exports = createMulter;
