const { fileURLToPath } = require("url");
const uuid = require("uuid").v4;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const myEnum = require("./enum");

exports.upload = (folderName) => {
  let imageCount = 0;

  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, `../uploads/${folderName}/`);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, uuid() + "-" + Date.now() + path.extname(file.originalname));
      },
    }),
    limits: { fileSize: myEnum },
    fileFilter: function (req, file, cb) {
      imageCount++;
      cb(null, true);
    },
  });
};

///---------
//Upload with allowing specific file extensions
// const express = require("express");
// const multer = require("multer");
// const app = express();
// const myEnum = require("./enum");
// const path = require("path");
// const destination = "upload/user";
// const uuid = require("uuid").v4; // use to generate new

// const diskStorage = multer.diskStorage({
//   destination: destination,
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${uuid()}_${Date.now()}${path.extname(file.originalname) || ""}`
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add your allowed extensions

//   // Ensure file.originalname exists before checking the extension
//   if (!file.originalname) {
//     cb(new Error("Invalid file name."), false);
//     return;
//   }

//   const fileExtension = path.extname(file.originalname).toLowerCase();

//   if (allowedExtensions.includes(fileExtension)) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed."),
//       false
//     );
//   }
// };

// const upload = multer({
//   storage: diskStorage,
//   limits: { fileSize: myEnum },
//   fileFilter: fileFilter,
// });

// module.exports = { upload };
///---------
