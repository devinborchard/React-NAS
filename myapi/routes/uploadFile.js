const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

var router = express.Router();

//route to store a file in the storage directory
//im not sure whats going on with this code but it works, I found it on the internet

const storage = multer.diskStorage({

  destination:(req, file, cb)=>{

    cb(null, 'directory')
  },
  filename: (req, file, cb) =>{
    console.log('FILE: ',file)
    cb(null,Date.now()+'~'+file.originalname)
  }
})

const upload = multer({storage}).array('file');

router.post('/',  (req, res) => {
  upload(req, res, (err) =>{
    if(err){
      console.log('ERROR')
      return res.status(500).json(err)
    }

    return res.status(200).send(req.file)

  })
});
module.exports = router;
