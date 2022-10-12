const express = require('express')
const path = require('path')
const productsRoutes = require('./src/routes/productsRoutes') 
const cartsRoutes = require('./src/routes/cartsRoutes') 
const port = 3001 || process.env.PORT;

const app = express();
/*
app.set('views', './views');
app.set('view engine', 'ejs',);
*/
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/productos', productsRoutes)
app.use('/carrito', cartsRoutes)


/*const server = app.listen(port, ()=>{
    console.log(`Se está escuchando por el puerto ${port}`);
})
server.on('error', err=>{console.log(err)});
*/


module.exports = app