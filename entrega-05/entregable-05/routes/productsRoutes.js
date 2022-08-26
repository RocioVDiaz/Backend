const express = require('express')
const router = express.Router();

router.get('/mostrarProducto', (req, res)=>{
    res.render('productos', {lista:'productos'})

})
router.get('/agregarProducto', (req, res)=>{
    res.render('agregarProducto')
})
router.post('/',(req, res)=>{
    let datos= req.body;
    res.redirect('/producto/agregarProducto');
})
module.exports = router;