const fs = require('fs');

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async save(objeto) {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido
            try {

                contenido = await JSON.parse(data)

            } catch (err) {

                contenido = []

            }

            objeto.id = contenido.length + 1
            contenido.push(objeto)
            fs.writeFile(this.nombreArchivo, JSON.stringify(contenido), error => {
                if (error) {
                    console.log(error)
                } else {
                    return objeto.id
                }
            })
        }
        catch (err) {
            console.log('Error de guardado', err)
        }
    }
    async getById(id){
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido
            try {
    
                contenido = await JSON.parse(data)
    
            } catch (err) {
    
                contenido = []
    
            }
            let encontrado = contenido.find(elemento => elemento.id == id);
            if (encontrado == undefined) {
                encontrado = null
            }
            return encontrado
        }
        catch (err) {
            console.log('Error al buscar el elemento por el id ', err)
        }  
    } 
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido
            try {
    
                contenido = await JSON.parse(data)
    
            } catch (err) {
    
                contenido = []
    
            }
            return contenido
        }
        catch (err) {
            console.log('Error al obtener el contenido', err)
        }   
    }
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido
            try {
    
                contenido = await JSON.parse(data)
    
            } catch (err) {
    
                contenido = []
            }
            let resultado = await contenido.filter(elemento => elemento.id != id )
            fs.promises.writeFile(this.nombreArchivo, JSON.stringify(resultado))
         
        }
        catch (err) {
            console.log('Error al borrar el elemento', err)
        }
    }
    async deleteAll () {
        try {
            fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
         
        }
        catch (err) {
            console.log('Error al borrar todos los elementos', err)
        }
    }


}

module.exports = Contenedor



 const productos  = new Contenedor('./productos.txt'); 

 
let object ={                                                                                                                                                    
    title: "regla",                                                                                                                                 
    price: 50.00,                                                                                                                                     
    thumbnail: "https://cdn0.iconfinder.com/data/icons/fitness-95/24/height-measurement-512.png",                                     
                                                                                                                                                  
  }
//productos.save(object); 


 setTimeout(async () => {console.log(await productos.getById(3))}, 100)
//setTimeout(async () => {console.log(await productos.getAll())}, 200)
//setTimeout(async () => {await productos.deleteById(4)}, 800)

//productos.deleteAll()