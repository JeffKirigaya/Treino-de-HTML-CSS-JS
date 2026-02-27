let produtos = [
    {nome: "mouse", preco: 29.90, categoria: "eletronico"},
    {nome: "teclado", preco: 59.90, categoria: "eletronico"},
    {nome: "monitor", preco: 1129.90, categoria: "eletronico"},
    {nome: "celular", preco: 2929.90, categoria: "eletronico"}
]

console.log(`${produtos[1].nome}`)
console.log(`${produtos[2].preco}`)

for (let s = 0 ; s <= 3; s++) {
    console.log(`${produtos[s].nome}`)
}