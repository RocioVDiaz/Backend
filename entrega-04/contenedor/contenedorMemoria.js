class ContenedorMemoria {
    contructor(){
        this.productos=[];
    }
    getAll(){
        return this.productos
    }
    getOne (id){
        let obj = this.productos.filter(p=>p.id == Number(id));
        return obj;
    }
    updateOne (id,obj){
        this.productos.forEach(p=>{
            if(p.id == Number(id)){
                p=obj
            }
        })
        return this.productos
    }

}