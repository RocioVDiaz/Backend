const express = require('express')
const router = express.Router();
const Contenedor = require('../contenedor')
const carritos  = new Contenedor('./src/carritos.txt');
const productos = new Contenedor('./src/productos.txt')


router.post('/',async (req, res)=>{
    let carrito={productos:[]}    
    return res.status(200).json({msg: await carritos.save(carrito)})
})

router.delete('/', async (req, res)=>{
    let id = req.body.id;
    if(!id){
        return res.status(400).json({msg: 'El campo id es obligatorio'})
    }
    return res.status(200).json({msg: await carritos.deleteById(id)})
})

router.get ('/:id/productos', async (req,res)=>{
   let id = req.params.id;
   let carrito= await carritos.getById(id)   
   if(carrito == null){
    return res.status(400).json({msg: `no existe este carrito`})
   }
    return res.status(200).json(await carrito.productos)
})
router.post ('/:id/productos/:idProducto', async (req,res)=>{
    let id = req.params.id;
    let idProducto= req.params.idProducto;   
    let producto = await productos.getById(idProducto) 
    let carrito= await carritos.getById(id)   
    if(carrito == null){
        let carritoNuevo={productos:[producto]}
        return res.status(200).json({msg: await carritos.save(carritoNuevo)})
    }
    carritos.updateOneCart(id,producto)
    return res.json({msg:"producto guardado exitosamente"})
 })

 router.delete ('/:id/productos/:idProducto', async (req,res)=>{
    let id = req.params.id;
    let idProducto= req.params.idProducto;
    let carrito= await carritos.getById(id)   
    if(carrito == null){
        return res.status(400).json({msg: `no existe este carrito`})
    }
    return res.status(200).json({msg: await carritos.deleteProduct(id,idProducto)})    
 })


module.exports = router;