const {Server:HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')
const app = require('./app.js')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let messages = [
    {author:"Juan",text:"Hola ¿Qué tal?"},
    {author:"Pedro",text:"Muy bien, ¿y vos"},
    {author:"Ana",text:"¡Genial!"}
]

const PORT = process.env.PORT || 3000;

const server = httpServer.listen (PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().PORT}`);
});

server.on('error', (error) => console.error(`Error en servidor ${error}`));

io.on('connection',(socket)=>{
    console.log('se conecto un cliente');
    //para enviar 
    socket.emit('messages',{messages,products:products.getAll()})
    socket.on('new-message',(data)=>{
        // messages.push(data);
        messages=[...messages,data]
        // console.log(products.getAll());
        console.log(messages);
        let todo ={messages:messages,products:products.getAll()}
        io.sockets.emit('messages',todo)
    })
    socket.on('new-product',(data)=>{
      console.log(data);
      products.save(data);
      console.log(products.getAll());
        let todo ={messages:messages,products:products.getAll()}
      io.sockets.emit('messages',todo)
    })
})