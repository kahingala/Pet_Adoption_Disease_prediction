const multer = require("multer");
const path = require("path");

// Storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Folder to store images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); 
    }
});

// File filter for image files only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Upload middleware
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
