 let texto = document.getElementById('add')
 let lista = document.getElementById('list')

 function adicionar() {
    if (texto.value.length == 0) {
        alert('Por favor, digite algo!')
    } else {
       /* let itens = document.createElement('li')
        lista.appendChild(itens)
        itens.innerHTML = `${texto.value}`
        */
       texto.innerHTML = 'teste'
    }
    
 }