const express = require('express')
const router = express.Router();
const clienteSql= require('../sql/Config/clienteSql');



router.get('/mostrarProducto', async (req, res)=>{
    const products= await clienteSql.select('*').from('products')
    res.render('productos', {productos: await products})

})

router.get('/agregarProducto', (req, res)=>{
        res.render('agregarProducto')
})
router.get ('/detalle/:id', async (req,res)=>{
    let id = req.params.id;
    const products= await clienteSql.select('*').from('products')
   let miProducto = await products.filter(p=>p.id == id);
   if(await miProducto.length == 0){
    return res.send(`no existe este producto`)
   }
   res.send(await miProducto) 
})

router.post('/', async (req, res)=>{
    let datos= req.body;
    const { title, price, thumbnail} = data;
    const newproduct = await clienteSql.insert( {title, price, thumbnail} ).into('products')
    res.redirect('/productos/agregarProducto');
    

})
module.exports = router;