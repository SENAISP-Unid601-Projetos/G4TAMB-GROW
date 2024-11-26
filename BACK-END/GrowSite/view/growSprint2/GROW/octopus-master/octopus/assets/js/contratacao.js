window.addEventListener('DOMContentLoaded',()=>{
    let dadosLocal = localStorage.getItem('DadosUsuario');
    dadosLocal = JSON.parse(dadosLocal);
    if(dadosLocal.img != null){
        document.getElementById('imgTop').src = dadosLocal.img
    }

    let cnpj = dadosLocal.cnpj;
    if(document.getElementById('container')){
        buscaCandidatos(cnpj)
    }
})

async function buscaCandidatos(cnpj) {
    let dados = {
        cnpj: cnpj
    };
    dados = JSON.stringify(dados);
    
    try {
        const res = await fetch(`/usuarioPorVaga`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dados
        });
        
        if (!res.ok) {
            throw new Error('Deu Ruim!');
        }
        
        const resJson = await res.json();
        montaCandidatos(resJson.respDados)
        
    } catch (erro) {
        console.log(erro);
    }
}
function montaCandidatos(candidatos) {

    for(var i = 0; i < candidatos.length; i++){
        var candidatoAtual = candidatos[i];

        let dataTratada = candidatoAtual.data_nascimento.split('T')[0];
        dataTratada = dataTratada.split('-');
        dataTratada = dataTratada.reverse();
        dataTratada = `${dataTratada[0]}/${dataTratada[1]}/${dataTratada[2]}`
        
        let cpf = btoa(`cpf=${candidatoAtual.cpf}`)
        let idVaga = btoa(`id_vaga_usuario=${candidatoAtual.id_usuario_vaga}`)

        let genero;
        if(candidatoAtual.genero == 'M') {
            genero = "Candidato"
        } else{
            genero = 'Candidata'
        }


            let html = `
            <div class="row" id="pg-6">
                                        <div class="col-md-6" id="pg-6">
                                            <div class="row mt-lg pt-lg">
                                            <div class="col-md-3">
                                                <section class="panel">
                                                    <div class="panel-body pg" style="margin-left: -60px;width: 200px; height: 200px;">
                                                        <div class="owl-carousel" data-plugin-carousel data-plugin-options='{ "items": 1, "autoHeight": true }'>
                                                            <div class="item">
                                                                <img alt="" class="img-responsive" src="${candidatoAtual.img}" style="margin-top: 0px;">
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
                                                            <a href="#popular" data-toggle="tab"><i></i>${candidatoAtual.nome} ${candidatoAtual.sobrenome}</a>
                                                        </li>
                                                    </ul>
                                                <div class="tab-content" id="pg-tab" style="width: 600px; margin-left: -5px;">
                                                    <div id="popular" class="tab-pane active">
                                                        <div class="favoritar"><p><strong>${genero} pela Vaga: </strong>${candidatoAtual.necessidade}</p> <a href="pages-lock-screen-example.html?${cpf}&${idVaga}"><i class="fa fa-chevron-right" style="cursor: pointer; margin-right: 10px; size: 50px;"></i></a></div>
                                                        <p><strong>Endereço: </strong>${candidatoAtual.rua}, ${candidatoAtual.numero}, ${candidatoAtual.cidade} ${candidatoAtual.estado}</p>
                                                        <p><strong>Data de Nascimento: </strong>${dataTratada}</p> 

                                                        <div style="display: flex;
                                                        justify-content: right;
                                                        align-items: center;">
                                                        <button class="entraremcontato dispensar" onclick="dispensar(${candidatoAtual.id_usuario_vaga})">Dispensar</button>
                                                        <button class="entraremcontato contratar" onclick="contratar(${candidatoAtual.id_usuario_vaga})">Contratar</button>
                                                        
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    `;
    document.querySelector('#container').innerHTML += html;
    }
    
}
function contratar(id) {
     fetch(`/contratar?id=${id}`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
     })
         .then(res => {
             if(!res.ok) {
                 throw new Error('Deu Ruim')
             }
             return res.json()
         })
         .then(resJson => {
             if(resJson.sucesso == true) {
                enviaEmail(resJson.respSelect[0],'contrato')
                Swal.fire({
                    title: "Contratado",
                    text: "Candidato Contratado com Sucesso",
                    icon: "success"
                    })
                    window.location.reload();
             }
         })
         .catch(erro => {
             console.log(erro);
            
         })
}
function dispensar(id){
    fetch(`/contratar?id=${id}`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        }
     })
         .then(res => {
             if(!res.ok) {
                 throw new Error('Deu Ruim')
             }
             return res.json()
         })
         .then(resJson => {
             if(resJson.sucesso == true) {
                enviaEmail(resJson.respSelect[0],'dispensa')
                Swal.fire({
                    title: "Dispensado",
                    text: "Candidato dispensado com Sucesso",
                    icon: "success"
                    });
                window.location.reload();
             }
         })
         .catch(erro => {
             console.log(erro);
            
         })
}

function enviaEmail(objEmail, tipo){
    console.log(objEmail);
    let obj;
    if(tipo == 'contrato') {
        obj = {
                email_usuario : objEmail.email_usuario,
                assunto : `E-mail a Respeito da Vaga para ${objEmail.necessidade} na Empresa ${objEmail.razao}`,
                texto : `<p>Olá ${objEmail.nome}, a <strong>Grow Business</strong> Gostaria de Informar que você foi aprovado para a Vaga de
                        ${objEmail.necessidade} na Empresa <strong>${objEmail.razao}</strong>. Para mais informações entre em contato pelo 
                        E-mail: ${objEmail.email_empresa}
                        </p>`,
                email_empresa : objEmail.email_empresa
            }
    } else if(tipo == 'dispensa') {
        obj = {
            email_usuario : objEmail.email_usuario,
            assunto : `E-mail a Respeito da Vaga para ${objEmail.necessidade} na Empresa ${objEmail.razao}`,
            texto : `<p>Olá ${objEmail.nome}, a <strong>Grow Business</strong> informa que você, infelizmente, <strong>não foi aprovado</strong> para a Vaga de
                    ${objEmail.necessidade} na Empresa <strong>${objEmail.razao}</strong>. Que tal dar uma olhada em outros anúcios no Site da Grow!
                    
                    </p>`,
            email_empresa : objEmail.email_empresa
        }
    }

     
    obj = JSON.stringify(obj)
    fetch('/emailContratacao', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : obj
    })
        .then(res => {
            if(!res.ok){
                throw new Error('Deu Ruim')
            }
            return res.json()
        })
        .then(resJson =>{
            console.log(resJson);
        })
        .catch(erro =>{
            console.log(erro);
            
        })
}   