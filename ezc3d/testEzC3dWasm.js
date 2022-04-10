const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const fs = require('fs');
const app = express();
const cors = require("cors");
const multer = require('multer')

//Enabling all CORS
app.use(cors());
app.options("*", cors());

var factory = require('./c3d_wrapper.js');
dir = "/Users/HP/fullstack-assignment-1/ezc3d/uploads"; 

//ATTENTION: global variable 'dir' is used and expected by WASM library


//Serving static folder 'uploads' for uploads.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Parse requests of content-type - application/json
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} `
  )
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')

  },
  filename: function (req, file, cb) {
     
      console.log(file)

      cb(null,file.originalname )     
   
  }
})

const upload = multer({
  storage: storage
})


app.get("/", (req, res) => {
  res.json({"message": "Welcome to the C3D TASK."});
});


app.post(
"/upload",
upload.fields([{ name: 'assetFile', maxCount: 1 }]),
(req,res)=>{

  try {
    factory().then((instance) => {

      const api = {
        testReadC3d: instance.cwrap('testReadC3d', 'string', ['string']),
        testMessage: instance.cwrap('testMessage', 'string', ['string'])
      }
      
      fs.readdir('./uploads', (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
      });
      let result = api.testReadC3d(req.files['assetFile'][0].originalname);
      let json = JSON.parse(result);
      console.log(json)
      
      return res.status(200).json({success: true, message: "Upload Successful", asset: json});
    
    });
  } catch (error) {
    return res.status(200).json({sucess: false, error: error.message})
  }
}
);


