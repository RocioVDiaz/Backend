const clienteSql= require('./Config/clienteSql');


clienteSql.schema.hasTable('products')
.then(exists => {
    if (!exists) {
        clienteSql.schema.createTable('products', tabla => {
            tabla.increments('id'),
                tabla.string('title'),
                tabla.float('price'),
                tabla.string('thumbnail')
        })
            .then(() => {
                console.log('tabla "products" creada!')
            })
    } else {
        console.log('la tabla "productos" ya existe. no se realizaron cambios')
    }
}).then(()=> clienteSql.schema.hasTable('messages')
.then(exists => {
    if (!exists) {
        clienteSql.schema.createTable('messages', tabla => {
            tabla.increments('id'),
                tabla.string('author'),
                tabla.dateTime('date'),
                tabla.string('text')
        })
            .then(() => {
                console.log('tabla "messages" creada!')
            })
    } else {
        console.log('la tabla "messages" ya existe. no se realizaron cambios')
    }
}))
.finally(() => {
    clienteSql.destroy()
})

