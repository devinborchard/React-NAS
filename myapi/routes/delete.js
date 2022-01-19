const express = require('express');
var router = express.Router();

fs = require('fs');



router.post('/', function(req, res, next) {



  console.log('get: ', req.body.file)

  var path = './directory/'+req.body.file
  

  fs.unlink(path, (err) => {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
  });
    

});

module.exports = router;
