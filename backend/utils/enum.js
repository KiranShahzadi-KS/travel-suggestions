const myEnum = {
  Ok: "Ok",
  NotOk: "Not Ok",
  MaxSize: 1 * 1024 * 1024, ///Approx Value is 1MB
};

// const fileFilter = (req, file, cb) => {
//   const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"]; ///Add Your Allowed Extensions
//   const fileExtension = path.extname(file.origninalname).toLowerCase();

//   if (allowedExtensions.includes(fileExtension)) {
//     cb(null, true); //Accept the file
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed."),
//       false
//     );
//   }
// };

module.exports = {
  myEnum,
  //   fileFilter,
};
