const express = require('express');
var router = express.Router();


fs = require('fs');

router.get('/',  function(req, res){

  var dirname = '../myapi/directory/'
  var files_to_send = []
  console.log(__dirname)

  fs.readdir(dirname, (err, files) => {
    if (err) {
        throw err;
    }

    
    // files object contains all files names
    // log them on console
    res.send({data:files})


  });

  
  

});
module.exports = router;
