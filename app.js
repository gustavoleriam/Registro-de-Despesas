class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){

        for(let i in this){
            if(this[i] == undefined || this[i]== '' || this[i] == null)
            return false
        }
        return true
    }
    
}

class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id',0)
        }
    }
    
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) +1
    }
    gravar(d){
      let id = this.getProximoId()
      localStorage.setItem(id,JSON.stringify(d))
      
      localStorage.setItem('id',id)
    }

    recuperarTodosRegistros(){ 
           
        let despesas = Array()




        let id = localStorage.getItem('id')
        for (let i = 1 ; i <= id; i++){


            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }
            despesa.id = i
             despesas.push(despesa)
        }
       return despesas
    }
    pesquisar(despesa){
        let despesasFiltradas = Array()

       despesasFiltradas = this.recuperarTodosRegistros()

       if(despesa.ano != ''){
        console.log('filtro de ano')
       despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)}
       if(despesa.mes != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)}
       if(despesa.dia != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)}
       if(despesa.tipo != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)}
       if(despesa.descricao != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)}
       if(despesa.valor != ''){
        despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)}

        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
    
}
let bd = new Bd()



function cadastrarDespesa(){
let ano = document.getElementById('ano') 
let mes = document.getElementById('mes')
let dia =  document.getElementById('dia')
let tipo = document.getElementById('tipo')
let descricao = document.getElementById('descricao')
let valor =  document.getElementById('valor')



let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
    )


    function limparDespesa(){

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    }
 if(despesa.validarDados())
{ bd.gravar(despesa)
    
   $('#Modal').modal('show')
   document.getElementById('exampleModalLabel').innerHTML ='Registrado '
   document.querySelector('.modal-body').innerHTML = 'Registrado com sucesso!'
   let btn = document.getElementById('btn')
   btn.innerHTML = 'Voltar'
   btn.className = 'btn btn-success'
   

   limparDespesa()
   
   
   
   


} else{
   $('#Modal').modal('show')
   document.getElementById('exampleModalLabel').innerHTML ='Erro '
   document.querySelector('.modal-body').innerHTML = 'Há campos vazios!'
   let btn = document.getElementById('btn')
   btn.innerHTML = 'Voltar e corrigir'
   btn.className = 'btn btn-danger'
   
   
   
   
}
   




  
  
}

function carregaListaDespesas(){

    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()


  

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d){
  
        let linha = listaDespesas.insertRow()
      
        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes}/ ${d.ano}`
        
      
      
        switch(d.tipo){
         case '1': d.tipo = 'Alimentação'
         break
         case '2': d.tipo = 'Educação'
         break
         case '3': d.tipo = 'Lazer'
         break
         case '4': d.tipo = 'Saúde'
         break
         case '5': d.tipo = 'Transporte'
         break
         
      
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            

            let id = this.id.replace('id_despesa_', '')
            

            bd.remover(id)

            window.location.reload()
           
        }
        

        linha.insertCell(4).append(btn)

    })


}
function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia =  document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor =  document.getElementById('valor').value

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
    let despesas = bd.pesquisar(despesa)
    
    this.carregaListaDespesas(despesas, true)
    
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d){
  
        let linha = listaDespesas.insertRow()
      
        linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes}/ ${d.ano}`
        
      
      
        switch(d.tipo){
         case '1': d.tipo = 'Alimentação'
         break
         case '2': d.tipo = 'Educação'
         break
         case '3': d.tipo = 'Lazer'
         break
         case '4': d.tipo = 'Saúde'
         break
         case '5': d.tipo = 'Transporte'
         break
         
      
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            alert(this.id)
           
        }
        

        linha.insertCell(4).append(btn)

    })
      
       
    
    
}


  
  
  