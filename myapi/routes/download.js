const express = require('express');
var router = express.Router();

fs = require('fs');

//route to send a file from storage back to the caller
router.post('/', function(req, res, next) {

  console.log('load get: ', req.body)

  //create path from the file in the request body
  path = './directory/'+req.body.file

  //add the downloaded file to the response
  res.download(path)
  
});

module.exports = router;
