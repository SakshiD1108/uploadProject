import express from "express";
import path from "path";
import { factory } from "../respository-helper/factory";
import fs from "fs";
import ShortUniqueId from "short-unique-id";
import download from "download"
import DownloaderHelper from "node-downloader-helper"
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


var color =  uid.randomUUID(6);


router.post("/", upload.single("file") , async (request, response) => {
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
      .fileUpload(userName,userId, updateFiles ,color);
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


router.get("/",  async (request, response) => {
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



router.delete("/", async (request, response) => {
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
          message: "files uploaded add successfully.",
        });
        return;
      } else {
        response.status(200).json({
          status: "FAILED",
          message: "file upload not  successfully.",
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


router.get("/download", async(req, res) => {
  try{

    const code = req.query.code
    // const fileUrl ="uploads/sakshi/1657373564626.jpg"
    // const fileUrl =process.cwd() + "uploads/sakshi/1657439943971.jpg";
    // console.log(process.cwd())

    // const dirPath = path.join(__dirname, 'uploads/sakshi/1657439943971.jpg')
    //  console.log(dirPath)

    // let matchCode  = await factory 
    // .getMongobdFileUpload()
    // .getCode(code);

     let matchCode = true;

    console.log(matchCode)
    
    if (matchCode) {

     // const file = 'GFG.jpeg';
// Path at which image will be downloaded
//const filePath = `${__dirname}/files`; 
  
// const  dl = new DownloaderHelper(file , filePath);
  
// dl.on('end', () => console.log('Download Completed'))
// dl.start();

    //   res.download(dirPath, function(err) {
    //     if(err) {
    //         console.log(err);
    //     }
    // })

      // const path = "1657440745729.jpg";
      // const writeStream = fs.createWriteStream(dirPath);
   
      // res.pipe(writeStream);
   
      // writeStream.on("open", () => {
      //    writeStream.close();
      //    console.log("Download Completed!");
      // })
  
    // var src = fs.createReadStream(dirPath);
    // src.on('open', function () {
    //     src.pipe(res);
    //     console.log('down completed: ' + dirPath);
    // });
    // src.on('error', function (err) {
    //     console.log('' + err);
    // });

//const file = "uploads/sakshi/1657439943971.jpg";
// Path to store the downloaded file

// const filePath = `${__dirname}/uploads/sakshi/1657439943971.jpg`;

// let dl =  download(filePath);
  
// dl.on('end', () => console.log('Download Completed'))
// dl.start();


// download(filePath)
// .then(() => {
//    console.log('File downloaded successfully!');
// })
      // res.download(dirPath);
      // console.log( res.download(path))
      res.status(400).json({
        status: "ok",
        message: "files downloded.",
      });
      return;
    } else {
      res.status(200).json({
        status: "FAILED",
        message: "file  not download successfully.",
      });
      return;
    }

  }catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: error.message,
    });
    return;

  }
  
});