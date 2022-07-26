class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName () {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido}`
    }

    addMascotas (nombreMascota) {
        this.mascotas.push(nombreMascota)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addBook (nombreLibro, autor) {
        this.libros.push({ nombre: nombreLibro, autor: autor})
    }

    getBookNames () {
        let libros = []
        for (let libro of this.libros) {
            libros.push(libro.nombre)
        }
        return libros
    }
}

const usuario1 = new Usuario ('Rocio', 'Diaz',  [{nombre: 'Fundacion', autor: 'Isaac Asimov'}], ['Cielo'])

console.log(usuario1.getFullName()) 
usuario1.addMascotas('Boby') 
console.log(usuario1.countMascotas()) 
usuario1.addBook('El señor de las moscas', 'William Golding') 
console.log(usuario1.getBookNames()) 