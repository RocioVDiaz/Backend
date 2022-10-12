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

          objeto.id = !contenido.length ? 1 : contenido[contenido.length-1].id + 1
          contenido.push(objeto)
          fs.writeFile(this.nombreArchivo, JSON.stringify(contenido), error => {
              if (error) {
                  console.log(error)
                  return `Error de guardado ${error}`
              } else {
                  console.log(objeto.id)
                  return objeto.id                 
              }
          })
      }
      catch (err) {
          console.log('Error de guardado', err)
          return `Error de guardado ${err}`
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
  
              console.log(err)
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
          
          let encontrado= await this.getById(id)
          if(encontrado== null){
            return "no existe un elemento con ese id"
           }
                    
          let resultado = await contenido.filter(elemento => elemento.id != id )
          fs.promises.writeFile(this.nombreArchivo, JSON.stringify(resultado))
       
      }
      catch (err) {
           console.log('Error al borrar el elemento', err)
           return err
      }
      return "Elemento borrado"
  }
  async deleteAll () {
      try {
          fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]))
       
      }
      catch (err) {
          console.log('Error al borrar todos los elementos', err)
      }
  }
  async updateOne(id,obj){
      try {
          let productos = await this.getAll()
          let indice = await productos.findIndex((p => p.id == id));
          productos[indice] = obj;
          fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos))
          return await productos
      } catch (error) {
          console.log('Error al modificar el elemento', error)  
      }    
      
  }
  async updateOneCart(id,obj){
    try {
        let carritos = await this.getAll()
        let indice = await carritos.findIndex((p => p.id == id));
        carritos[indice].productos.push(obj);
        fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos))
        return await carritos
    } catch (error) {
        console.log('Error al modificar el elemento', error)  
    }    
}

    async deleteProduct(id,idObj){
        try {
            let carritos = await this.getAll()
            let indice = await carritos.findIndex((p => p.id == id));
            carritos[indice].productos= carritos[indice].productos.filter(elemento => elemento.id != idObj );
            fs.promises.writeFile(this.nombreArchivo, JSON.stringify(carritos))
            return 'Elemento borrado exitosamente'
        } catch (error) {
            console.log('Error al modificar el elemento', error)  
            return `No se pudo borrar el elemento ${error}`
        } 
    
}

  

}

module.exports = Contenedor
