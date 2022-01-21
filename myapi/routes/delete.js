const express = require('express');
var router = express.Router();

fs = require('fs');

//route to delete a file from the storage directory
router.post('/', function(req, res, next) {

  console.log('get: ', req.body.file)

  //define the files path using the files file from the requests body
  var path = './directory/'+req.body.file
  
  //delete the file using unlink
  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log('successfully deleted');
  });
});

module.exports = router;
