const app = require('./app.js')
const PORT =  3000;

const clienteSql= require('./src/sql/Config/clienteSql');

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().PORT}`);
});

server.on('error', (error) => console.error(`Error en servidor ${error}`));

server.on('error', (err) => {
    console.log(err);
})

io.on('connection',async (socket) => {
    console.log('se conecto un cliente');
    const messages= await clienteSql.select('*').from('messages')
    const products= await clienteSql.select('*').from('products')
    socket.emit('messages', { messages: await messages , products:  await products })

    socket.on('new-message', async (data) => {
        const { author, text } = data;
        const date= new Date();
        const newMessage = await clienteSql.insert( {author, date, text} ).into('messages')
        const newMessages= await clienteSql.select('*').from('messages')


        console.log(messages);
        let todo = { messages: await newMessages, products:  await products }
        io.sockets.emit('messages', todo)
    })
    socket.on('new-product', async (data) => {
        const { title, price, thumbnail} = data;
        const newproduct = await clienteSql.insert( {title, price, thumbnail} ).into('products')
        const newproducts= await clienteSql.select('*').from('products')
        
        let todo = { messages: await messages, products:  await newproducts}
        io.sockets.emit('messages', todo)
    })
})