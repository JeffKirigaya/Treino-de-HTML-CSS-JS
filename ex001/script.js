 let texto = document.getElementById('add')
 let lista = document.getElementById('list')

 texto.addEventListener('keydown', function(e) {
   if (e.key === 'Enter') {
      adicionar()
   }
 })

 function adicionar() {
    if (texto.value.trim() === '') {
         alert('Por favor, digite algo!')
    } else {
         let itens = document.createElement('li')
         itens.textContent = texto.value
         
         itens.addEventListener('click', function() {
            itens.classList.toggle('completed')
         })

         let btnRemover = document.createElement('button')
         btnRemover.textContent = 'X'

         btnRemover.addEventListener('click', function(e) {
            e.stopPropagation()
            itens.remove()
         })

         itens.appendChild(btnRemover)

         lista.appendChild(itens)
         texto.value = ''
         texto.focus()  
    }
    
    
 }