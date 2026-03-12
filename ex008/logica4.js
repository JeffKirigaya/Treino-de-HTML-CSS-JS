let numero =  15;

if (numero % 3 == 0 && numero % 5 == 0) {
    console.log("Divisível por 3 e 5");
} else if (numero % 5 == 0) {
    console.log("Divisível por 5");
} else if (numero % 3 == 0) {
    console.log("Divisível por 3");
} else {
    console.log("Número comum");
}