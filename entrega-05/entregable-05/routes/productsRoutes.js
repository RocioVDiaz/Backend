const express = require('express')
const router = express.Router();

let id = 3; 
let listaProductos =[
    {title:"Calculadora", price:234.56, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",id:1},
    {title:"Globo Terráqueo", price:345.67, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",id:2},
    {title:"Escuadra", price:123.45, thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png", id:3}
]
router.get('/mostrarProducto', async (req, res)=>{
    res.render('productos', {productos: listaProductos})

})

router.get('/agregarProducto', (req, res)=>{
    console.log("hola")
    res.render('agregarProducto')
})
router.get ('detalle/:id', (req,res)=>{
   let id = req.params.id;
   let miProducto = listaProductos.filter(p=>p.id == id);
   res.send(miProducto) 
})

router.post('/',(req, res)=>{
    let datos= req.body;
    datos.id=id++;
    listaProductos=[...listaProductos,datos]
    res.redirect('/productos/agregarProducto');
    

})
module.exports = router;