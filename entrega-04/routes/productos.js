var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/:id', (req,res)=>{
  res.send({producto:producto})  
})
router.post('/', ({body},res)=>{
  res.send({datos:body})
})
router.put('/:id', (req,res)=>{
  let id =req.params.id;
  res.send({datos:req.body})
})
router.delete('/:id', (req,res)=>{
  res.send({datos:req.body})
})

module.exports = router;
