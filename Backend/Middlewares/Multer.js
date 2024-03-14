const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Uploading a User Profile Image
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileType = file.mimetype.split("/")[1];
    const filename = uuidv4() + "." + fileType;
    cb(null, filename);
  },
});
const ProfileUpload = multer({ storage }).single("ProfileAvatar");

module.exports.UserProfileUpload = ProfileUpload;
