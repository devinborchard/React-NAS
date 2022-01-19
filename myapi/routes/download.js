const express = require('express');
var router = express.Router();

fs = require('fs');

router.get('/',  function(req, res){
  console.log('load get: ', req.body)


  path = './directory/crocs.PNG'
  res.download(path)

  

});

router.post('/', function(req, res, next) {



  console.log('load get: ', req.body)


  path = './directory/'+req.body.file
  res.download(path)
  

});

module.exports = router;
