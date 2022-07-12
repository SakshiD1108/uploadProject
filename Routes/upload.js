import express from "express";
import path from "path";
import { factory } from "../respository-helper/factory";
import fs from "fs";
import ShortUniqueId from "short-unique-id";
import download from "download"
import {authenticateUserJWT} from "../authentication-hepler/validate-user-jwt-middleware"
import upload from "../multer";
import { request } from "http";
let __dirname = path.resolve();

export const router = express.Router();
export default router;


var uid = new ShortUniqueId({
  dictionary: [
    '0', '1', '2', '3',
    '4', '5', '6', '7',
    '8', '9',
  ],
});


var uid = new ShortUniqueId({ dictionary: 'hex' });


var shortCode =  uid.randomUUID(6);


router.post("/",authenticateUserJWT, upload.single("file") , async (request, response) => {
  try {

    const file = request.file;
    const userName = request.body.userName;
    const userId = request.body.userId ;


    // Replacing '\\' to '/' the url for correct format
    const splitUrlArray = file.destination.split("/");
    let filteredUrl =
      splitUrlArray[splitUrlArray.length - 3] +
      "/" +
      splitUrlArray[splitUrlArray.length - 2] +
      "/" +
      splitUrlArray[splitUrlArray.length - 1] +
      file.filename;
    const updateFiles = filteredUrl;
    console.log(updateFiles);

    const files = await factory
      .getMongobdFileUpload()
      .fileUpload(userName,userId, updateFiles ,shortCode);
      console.log(files)
    if (files) {
      response.status(400).json({
        status: "FAILED",
        message: "file upload not  successfully.",
      });
      return;
    } else {
      response.status(200).json({
        status: "ok",
        message: "files uploaded add successfully.",
      });
      return;
    }
  } catch (error) {
    response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;
  }
});


router.get("/", authenticateUserJWT, async (request, response) => {
  try {
    const userId = request.query.userId;

    const getAllFiles = await factory.getMongobdFileUpload().getFiles(userId);
    console.log(getAllFiles)

    if (getAllFiles) {
        response.status(200).json({
            status: "SUCCESS",
            message: "files fetched successfully",
            getAllFiles
        });
        return;
    }
} catch (error) {
    response.status(500).json({
        status: "FAILED",
        message: error.message
    });
    return
}
});



router.delete("/", authenticateUserJWT,async (request, response) => {
  try {
    const fileUrl = request.body.fileUrl;

    fs.unlink(fileUrl, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log("File deleted!");
   
      let files =  factory 
      .getMongobdFileUpload()
      .fileDelete(fileUrl);
      
      if (files) {
        response.status(400).json({
          status: "ok",
          message: "files deleted successfully.",
        });
        return;
      } else {
        response.status(200).json({
          status: "FAILED",
          message: "file not deleted successfully.",
        });
        return;
      }
      
    });
  } catch (error) {
    response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;
  }
});


router.get("/download", async function (req, res, next) {

  const {
    userId,
    code
  } = req.query;

  const file = await factory.getMongobdFileUpload().getFile(userId, code);

  if (!file) {
    res.status(400).json({ message: 'No file found!' });
    return;
  }

  const filePath = path.join(__dirname, "./", file.fileUrl);

  const fileExist = fs.existsSync(filePath)

  if (!fileExist) {
    res.status(400).json({ message: 'No file found!' });
    return
  }


  res.download(filePath)
  res.status(400).json({
    status: "ok",
    message: "files downloded successfully.",
  });
}); 