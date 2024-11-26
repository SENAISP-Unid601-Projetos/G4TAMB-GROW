window.addEventListener('DOMContentLoaded',()=>{
    let dadosLocal = localStorage.getItem('DadosUsuario')
     dadosLocal = JSON.parse(dadosLocal)
    let cnpj = dadosLocal.cnpj
    carregaVagas(cnpj);
    if(dadosLocal.img != null) {
        document.getElementById('imgTop').src = dadosLocal.img
    }
})

async function carregaVagas (cnpj) {
    let dados = {
        cnpj : cnpj
    }
    dados = JSON.stringify(dados)
    await fetch ('/buscaVagasPorCNPJ', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : dados
    })
        .then(res => {
            if(!res.ok) {
                throw new Error('Deu Ruim')
            }
            return res.json()
        })
        .then(resJson =>{
            montaVagas(resJson)
        })
        .catch(erro => {
            console.log(erro);
            
        })
}
function montaVagas (resposta) {
    const respostas = resposta.resp
    document.getElementById('qtd').textContent = resposta.resp.length;
    for(var i = 0; i < respostas.length; i++){
        var vagaAtual = respostas[i];
        console.log(vagaAtual);
        
        let html = `
            <div class="row" id="pg-6">
                                        <div class="col-md-6" id="pg-6">
                                            <div class="row mt-lg pt-lg">
                                            <div class="col-md-3">
                                                <section class="panel">
                                                    <div class="panel-body pg" style="margin-left: -60px;">
                                                        <div class="owl-carousel" data-plugin-carousel data-plugin-options='{ "items": 1, "autoHeight": true }'>
                                                            <div class="item">
                                                                <img alt="" class="img-responsive" src="${vagaAtual.img}" style="margin-top: 0px;">
                                                            </div>
                                                            <!-- <div class="item">
                                                                <img alt="" class="img-responsive" src="assets/images/projects/project-2.jpg">
                                                            </div>
                                                            <div class="item">
                                                                <img alt="" class="img-responsive" src="assets/images/projects/project-4.jpg">
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                            <div class="tabs">
                                                <ul class="nav nav-tabs">
                                                    <li class="active">
                                                        <a href="#popular" data-toggle="tab"><i></i>${vagaAtual.razao}</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="pg-tab" style="width: 600px; margin-left: -5px;">
                                                    <div id="popular" class="tab-pane active" style="height: 85px;">
                                                        <div class="favoritar"><p><strong>Cargo: </strong>${vagaAtual.necessidade}</p> <div class="ico"><i class="fa fa-trash-o" style="margin-right: 10px; cursor: pointer;" onclick="excluirVaga(${vagaAtual.id})"></i><i style="margin-right: 10px;"></i><i class="fa fa-pencil-square-o" style=" cursor: pointer;" onclick="editar(${vagaAtual.id})"></i></div></div>
                                                        <p><strong>Salário: </strong>${vagaAtual.salario}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        `
        document.getElementById('container').innerHTML += html
    }   
}

function excluirVaga(idVaga) {
   
    Swal.fire({
        title: "Atenção",
        text: "Tem Certeza que quer Deletar essa Vaga?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText : "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          
            fetch(`/deletarVaga?id=${idVaga}`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            }
            })
                .then(res => {
                    if(!res.ok){
                        throw new Error('Deu Ruim')
                    }
                    return res.json()
                })
                .then(resJson => {
                    Swal.fire({
                    title: "Vaga Deletada",
                    text: "Sua Vaga Foi deletada com Sucesso",
                    icon: "success"
                    });
                })
                .then(()=>{
                    window.location.reload(); 
                })
                .catch(erro => {
                    console.log(erro);
                    
                    Swal.fire({
                        title: "Vaga não foi Deletada",
                        text: "Sua Vaga não Foi deletada, tente novamente",
                        icon: "error"
                        });
                    
                })
            
        }
      });
   
   
    
}     
function editar(id) {
    window.location.href = `/timeline/pages-blank.html?id=${id}`;
}