const app = require('./app.js')
const PORT =  3000;
const Contenedor = require('./src/contenedor')

const productos  = new Contenedor('./src/productos.txt');

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().PORT}`);
});


let messages = [

    {
        date: "25/8/2022 23:32:03 ",
        author: "Juan", text: "Hola ¿Qué tal?"
    },
    {
        date: "25/8/2022 23:32:03 ",
        author: "Pedro", text: "Muy Bien y vos?"
    },
    {
        date: "25/8/2022 23:32:03 ",
        author: "Ana", text: "Genial!"
    }
]





server.on('error', (error) => console.error(`Error en servidor ${error}`));

server.on('error', (err) => {
    console.log(err);
})

io.on('connection',async (socket) => {
    console.log('se conecto un cliente');
    setTimeout(async () => {console.log(await productos.getAll())}, 800)
    socket.emit('messages', { messages, products:  await productos.getAll() })

    socket.on('new-message', async (data) => {

        messages = [...messages, data]

        console.log(messages);
        let todo = { messages: messages, products: await productos.getAll() }
        io.sockets.emit('messages', todo)
    })
    socket.on('new-product', async (data) => {
        console.log(data);
        productos.save(data);
        console.log(productos.getAll());
        let todo = { messages: messages, products: await productos.getAll() }
        io.sockets.emit('messages', todo)
    })
})