const clienteSql= require('./Config/clienteSql');

const messages = [
{ date: "2022/8/25 23:32:03 ", author: "Juan", text: "Hola ¿Qué tal?"},
{ date: "2022/8/25 23:32:03 ", author: "Pedro", text: "Muy Bien y vos?"},
{ date: "2022/8/25 23:32:03 ", author: "Ana", text: "Genial!"}

]

clienteSql("messages").insert(messages)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        clienteSql.destroy()
    })