// Abrevia o nome da empresa
window.addEventListener('DOMContentLoaded', () => {
    let info = localStorage.getItem('DadosUsuario');
    
    info = JSON.parse(info);

    if(info.descricao != null) {
        document.getElementById('descricao').textContent = info.descricao;
    } else{
        document.getElementById('descricao').textContent = "Sua Empresa ainda não tem Descrição";
    }
    
    let nome = document.getElementById("nomes");
    let nomeTop = document.querySelectorAll('.nomePerfil')[0];
    nomeTop.textContent = info.razao

    if (info && info.razao) {
        let iniciais = info.razao.split(' ')
                                  .map(palavra => palavra.charAt(0) + ".")
                                  .join('');
        nome.textContent = iniciais;
    }
    document.getElementById("titlo").textContent = "Perfil de " + info.razao;
    document.getElementById("numero").textContent = (info.telefone).replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    document.getElementById("email").textContent = info.email;

    const imgs = document.querySelector('#img');
    const imgTop = document.querySelector('#imgTop')
    if(info.img == null){

    } else{
        imgs.src = info.img
        imgTop.src = info.img
    }

    if (info.celular == null || info.celular == "") {
    }    
    else{
            document.getElementById("celular").textContent = (info.celular).replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }

    document.getElementById('btn').addEventListener('click',()=>{
            novaVaga();
    });

    
    let dadosCNPJ ={
        cnpj : info.cnpj
    }
    dadosCNPJ = JSON.stringify(dadosCNPJ)

    fetch('/vagaPorEmpresa', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : dadosCNPJ
    })
        .then(res => res.json())
        .then(resJson =>{
            console.log(resJson.resp.length);
            document.getElementById('numVagas').textContent = resJson.resp.length;
            document.querySelector('#qtdSla').textContent = resJson.resp.length;
            
        })
        .catch(erro =>{
            console.log(erro);
            
        })

        qtdCandidatos();

    document.getElementById('btnAtualiza').addEventListener('click',()=> {
        atualizaDescricao(info)
    })

    
});



document.querySelector('#img').addEventListener('click', () => {
    const input = document.querySelector('#fileImg');
    input.click()
})

document.querySelector('#fileImg').addEventListener('change', async (e) => {
    const dadosImg = new FormData();
    const campoImg = e.target.files[0];
    dadosImg.append("image", campoImg);
    dadosImg.append("usuario", localStorage.getItem("DadosUsuario"));
    console.log(dadosImg)
    await fetch("/upload", {
        method:"POST",
        body: dadosImg
    })
    .then ( (resp) => {
        return resp.json();
    })
    .then( (dados) => {
        console.log(dados.filePath);
        
        const containerImg = document.querySelector(".thumb-info.mb-md img");
        containerImg.setAttribute("src", dados.filePath);
        const dadosUser = JSON.parse(localStorage.getItem("DadosUsuario"));
        dadosUser.img = dados.filePath;
        localStorage.setItem("DadosUsuario", JSON.stringify(dadosUser));
        window.location.reload();
    })
    .catch( (erro) => {
        alert("Erro: " + erro);
    })
})


function novaVaga(){
    
    let dadosUser = localStorage.getItem('DadosUsuario');
    dadosUser = JSON.parse(dadosUser)
    const obj = {
        necessidade : document.getElementById('necessidade').value,
        salario : document.getElementById('salario').value,
        carga_horaria : document.getElementById('carga').value,
        quantidade : document.getElementById('quantidade').value,
        descricao : document.getElementById('descricao').value,
        beneficios : document.getElementById('beneficios').value,
        cnpj : dadosUser.cnpj
    }
    const objString = JSON.stringify(obj)

    fetch('/criarVaga', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : objString
    })
        .then(res => res.json())
        .then(resJson => {
            window.location.reload()
        })
        .catch(erro =>{
            console.log(erro);
            
        })
}

async function qtdCandidatos(){
    let cnpj = localStorage.getItem('DadosUsuario');
    cnpj = JSON.parse(cnpj);
    cnpj = cnpj.cnpj;

    let dados = {
        cnpj : cnpj
    }
    dados = JSON.stringify(dados)

    await fetch('/contaCandidatos', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : dados
    })
        .then(res => {            
            if(!res.ok) {
                throw new Error('Falhou!!');
            } 
            return res.json()
        })
        .then(resJson => {
            document.querySelector('#qtdCandidatos').textContent = resJson.resp[0].count;
            
        })
        .catch(erro => {
            console.log(erro);
            
        })
}

async function atualizaDescricao (obj) {
    const descricao = document.getElementById('message-text');
    if(descricao.value != "") {
    let dados = {
        cnpj : obj.cnpj,
        descricao : descricao.value
    }
    dados = JSON.stringify(dados);
    await fetch('/alterarDescricao', {
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
            if(resJson.sucesso == true) {
                let dados = JSON.parse(localStorage.getItem("DadosUsuario"));
                dados.descricao = descricao.value;
                localStorage.setItem("DadosUsuario", JSON.stringify(dados));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: resJson.mensagem,
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    window.location.reload();
                  })
            } else {
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
}