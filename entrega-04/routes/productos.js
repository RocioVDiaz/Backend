var express = require('express');
var router = express.Router();
const Contenedor = require('../../entrega-02/entregable-2')

const productos  = new Contenedor('../entrega-02/productos.txt');


/* GET users listing. */
router.get('/', async (req, res) => {
   res.send( {data:JSON.stringify(await productos.getAll())})
})
router.get('/:id', async (req,res)=>{
  let obj= await productos.getById(req.params.id)
  res.send({data: await obj})  
})
router.post('/', async ({body},res)=>{
    res.send({data: await productos.save(body)})
})
router.put('/:id', async (req,res)=>{
  let id =req.params.id;
  console.log(await productos.updateOne(id,req.body))
  res.send({data: await productos.updateOne(id,req.body)})
})
router.delete('/:id', async (req,res)=>{
  let newData= await productos.deleteById(req.params.id)
  res.send({data: await newData})
})

module.exports = router;
