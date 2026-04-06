const adicionar = document.getElementById("add");
let resultado = document.getElementById("res");
const escurecer = document.getElementById("btn");
const body = document.body;
let contador = 0;

adicionar.addEventListener("click", () => {
    contador++;
    resultado.textContent = contador;
});

escurecer.addEventListener("click", () => {
    body.classList.toggle('escuro');
})