const express = require('express');
var router = express.Router();

fs = require('fs');

//route to get a list of all files stored in the system and send them back to the caller
router.get('/',  function(req, res){

  //define the storage directory
  var dirname = '../myapi/directory/'

  //read in all file names
  fs.readdir(dirname, (err, files) => {
    if (err) {
        throw err;
    }
    
    //respond with a list of the files
    res.send({data:files})
  });
});
module.exports = router;
