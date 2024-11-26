const necessidade  = document.getElementById('necessidade');
const quantidade = document.getElementById('quantidade');
const salario = document.getElementById('salario');
const carga_horaria = document.getElementById('carga');
const beneficios = document.getElementById('beneficios');
const descricao = document.getElementById('descricao');

window.addEventListener('DOMContentLoaded',()=>{
    let id = window.location.href;
    id = id.split('?id=')[1];
    getVaga(id)
    document.getElementById('botao').addEventListener('click',()=>{
        editar(id)
    })
})
async function getVaga(id) {
   await fetch(`/getVagaPorId?idVaga=${id}`)
    .then(res => {
        if(!res.ok){
            throw new Error("Deu Ruim!");
        }
        return res.json();
    })
    .then(resJson => {
        
        if(resJson.sucesso == true){
            const vaga = resJson.resp[0]
            console.log(vaga);
            
            necessidade.value = vaga.necessidade;
            quantidade.value = vaga.quantidade_de_vagas;
            salario.value = vaga.salario;
            carga_horaria.value = vaga.carga_horaria;
            beneficios.value = vaga.beneficios;
            descricao.value = vaga.descricao;
        } 
    })
    .catch(erro => {
        console.log(erro);
    })
}
async function editar(id) {
    let dados = {
        id : id,
        necessidade : necessidade.value,
        quantidade : quantidade.value,
        salario: salario.value,
        carga_horaria : carga_horaria.value,
        beneficios : beneficios.value,
        descricaoVaga : descricao.value
    }
    
    dados = JSON.stringify(dados)
    
    await fetch('/atualizarVaga', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : dados
    })
        .then(res => {
            if(!res.ok) {
                throw new Error("Deu Ruim!");
            }
            return res.json();
        })
        .then(resJson => {
            console.log(resJson);
            
            if(resJson.sucesso == true) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: resJson.mensagem,
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    window.location.reload();
                  })
            } else{
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: resJson.mensagem,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
        .catch(erro => {
            console.log(erro);
            
        })
}