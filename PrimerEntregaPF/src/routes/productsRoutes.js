const express = require('express')
const router = express.Router();
const Contenedor = require('../contenedor')

const productos  = new Contenedor('./src/productos.txt');

router.get('/mostrarProducto', async (req, res)=>{
    return res.status(200).json( {productos: await productos.getAll()})

})

router.get('/agregarProducto', (req, res)=>{
        res.render('agregarProducto')
})
router.get ('/detalle/:id', async (req,res)=>{
   let id = req.params.id;
   let listaProductos= await productos.getAll()
   let miProducto = await listaProductos.find(p=>p.id == id);
    if(miProducto.length == 0){
    returnres.status(400).json({msg: `no existe este producto`})
   }
   return res.status(200).json({p : await miProducto}) 
})

router.post('/',async (req, res)=>{
    let datos= req.body;
    if(!datos){
        return res.status(400).json({msg: 'Los datos del producto son obligatorios'})
    }
    return res.status(200).json({msg: await productos.save(datos)})
    //listaProductos=[...await productos.getAll(),datos]
   })
module.exports = router;