let email = document.getElementById('email')
let senha = document.getElementById('senha')
let toggle = document.getElementById('toggle')
let logar = document.getElementById('logar')

let toggleMin = document.getElementById('min')
let toggleNum = document.getElementById('num')
let toggleMai = document.getElementById('mai')

senha.addEventListener('input', function() {
    let valor = senha.value

    if (valor.length >= 8) {
        toggleMin.textContent = "✔ Mínimo 8 caracteres"
        toggleMin.style.color = 'lime'
    } else {
        toggleMin.textContent = "❌ Mínimo 8 caracteres"
        toggleMin.style.color = "red"
    }

    if (/[0-9]/.test(valor)) {
        toggleNum.textContent = "✔ Pelo menos 1 número"
        toggleNum.style.color = "lime"
    } else {
        toggleNum.textContent = "❌ Pelo menos 1 número"
        toggleNum.style.color = "red"
    }

    if (/[A-Z]/.test(valor)) {
        toggleMai.textContent = "✔ Pelo menos 1 letra maiúscula"
        toggleMai.style.color = "lime"
    } else {
        toggleMai.textContent = "❌ Pelo menos 1 letra maiúscula"
        toggleMai.style.color = "red"
    }
})

let icon = toggle.querySelector('i')

toggle.addEventListener('click', function() {
    if (senha.type === "password") {
        senha.type = "text"
        icon.classList.remove("fa-eye-slash")
        icon.classList.add("fa-eye")
    } else {
        senha.type = "password" 
        icon.classList.remove("fa-eye")
        icon.classList.add("fa-eye-slash")
    }       
}) 
