import multer from "multer";
import path from "path";
import fs from "fs";
var maxSize = 1 * 1000 * 1000;

var assign = multer.diskStorage({
  destination: function (req, file, cb) {
    const name = req.body.userName;
    const dir = `./uploads/${name}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, Date.now() + ext);
  },
  onFileUploadStart: function (file, req, res) {
    if (req.file.length > maxSize) {
      return response.send("file is large");
    }
  },
});

const upload = multer({
  storage: assign,
  limits: { fileSize: maxSize },
});

export default upload;
