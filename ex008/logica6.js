let palavra = "paralelepipedo";
let vogais = ""


for (let i = 0; i < palavra.length; i++) {
    if (palavra[i] == "a" || palavra[i] == "o" || palavra[i] == "e" || palavra[i] == "u" || palavra[i] == "i") {
        vogais += palavra[i]
    }
}

console.log(vogais.length)