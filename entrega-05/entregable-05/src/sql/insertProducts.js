const clienteSql= require('./Config/clienteSql');

const products = [
    {title:"Calculadora",price:234.56,thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"},
    {title:"Globo Terráqueo",price:345.67,thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"},
    {title:"Escuadra",price:123.45,thumbnail:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}
   
]

clienteSql("products").insert(products)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        clienteSql.destroy()
    })