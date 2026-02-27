let eletronicos = [" computador", " celular", " monitor", " HD"]
let moda = [" blusa", " calça", " sapato", " bolsa"]
let games = [" joystick", " mouse gamer", " teclado gamer", " cadeira gamer"]
let cozinha = [" panela", " copo", " talher", " fogão"]
let moveis = [" armario", " sofá", " guarda-ropa", " estante"]
let livros = [" Harry potter", " Diario de um banana", " corra", " kung-fu"]

let eletro = document.getElementById('ele')
let mods = document.getElementById('mod')
let gams = document.getElementById('gam')
let cozi = document.getElementById('coz')
let move = document.getElementById('mov')
let livr = document.getElementById('liv')

let res = document.getElementById('res')
let btn = document.getElementById('btn')

btn.addEventListener('click', function() {
    res.textContent = `Eletronicos: ${eletronicos}, Moda: ${moda}, Games: ${games}, Cozinha: ${cozinha}, Moveis: ${moveis}, Livros: ${livros}`
})

eletro.addEventListener('click', function() {
    res.textContent = `Eletronicos: ${eletronicos}`
})

mods.addEventListener('click', function() {
    res.textContent = `Moda: ${moda}`
})


gams.addEventListener('click', function() {
    res.textContent = `Games: ${games}`
})

cozi.addEventListener('click', function() {
    res.textContent = `Cozinha: ${cozinha}`
})

move.addEventListener('click', function() {
    res.textContent = `Moveis: ${moveis}`
})

liv.addEventListener('click', function() {
    res.textContent = `Livros: ${livros}`
})