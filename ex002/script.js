let resul = document.querySelector('div#res')
res = 0

function atualizarCor() {
    resul.classList.remove('verde')
    resul.classList.remove('vermelho')

    if (res > 0) {
        resul.classList.add('verde')
    } else if (res < 0) {
        resul.classList.add('vermelho')
    }
}

function somar() {
    if (res <= 49) {
        res += 1
        resul.innerHTML = res
        atualizarCor()
    } else { 
        alert('Atingiu o valor maximo!')
    }
}

function subtrair() {
    if (res >= -9) {
        res -= 1
        resul.innerHTML = res
        atualizarCor()
    } else {
        alert('Atingiu o valor minimo!')
    }
}

function zerar() {
    res = 0
    resul.innerHTML = res
    atualizarCor()
}

