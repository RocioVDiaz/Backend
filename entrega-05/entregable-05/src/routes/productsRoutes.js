const express = require('express')
const router = express.Router();
const products = require('../contenedor')
const Contenedor = require('../contenedor')

const productos  = new Contenedor('./src/productos.txt');

let id = 3; 
let listaProductos =[
    {title:"Calculadora", price:234.56, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",id:1},
    {title:"Globo Terráqueo", price:345.67, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",id:2},
    {title:"Escuadra", price:123.45, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", id:3}
]
router.get('/mostrarProducto', async (req, res)=>{
    res.render('productos', {productos: await productos.getAll()})

})

router.get('/agregarProducto', (req, res)=>{
        res.render('agregarProducto')
})
router.get ('/detalle/:id', (req,res)=>{
    let id = req.params.id;
   let miProducto = products.getAll().filter(p=>p.id == id);
   if(miProducto.length == 0){
    return res.send(`no existe este producto`)
   }
   res.send(miProducto) 
})

router.post('/',(req, res)=>{
    let datos= req.body;
    datos.id=id++;
    listaProductos=[...products.getAll(),datos]
    res.redirect('/productos/agregarProducto');
    

})
module.exports = router;