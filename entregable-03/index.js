const express = require('express')
const app = express()
const Contenedor = require('../entrega-02/entregable-2')

const productos  = new Contenedor('../entrega-02/productos.txt');

const PORT = 8080

app.get('/productos', async (req, res) => {
    return res.send(`${ JSON.stringify(await productos.getAll())}`)
})

app.get('/productoRandom', async (req, res) => {
    let p = await productos.getAll()    
    return res.send(`${  JSON.stringify(p[Math.floor((Math.random() * (p.length-0)) +0)])}`)
})

const server = app.listen (PORT, () => {
    console.log(`servidor HTTP con express corriendo en el puerto ${PORT}`)
})

server.on('error', error => console.log(`error en servidor: ${error}`))