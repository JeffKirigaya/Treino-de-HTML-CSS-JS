let numeros = [3, 7, 2, 9, 12];

let maior = numeros[0];

for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > maior) {
        maior = numeros[i]
    }
}

console.log(maior)