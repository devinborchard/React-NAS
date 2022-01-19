const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

app.use(cors());

var router = express.Router();

const storage = multer.diskStorage({

  destination:(req, file, cb)=>{

    console.log('GOT HERE')

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
