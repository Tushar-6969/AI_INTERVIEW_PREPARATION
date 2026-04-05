const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload folder relative to project root
const uploadDir = path.join(__dirname, "..", "uploads");

// Create folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // use absolute path safely
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, jpg, png format are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;