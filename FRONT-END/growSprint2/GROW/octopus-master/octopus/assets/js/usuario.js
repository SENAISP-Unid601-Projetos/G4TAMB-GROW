window.addEventListener('DOMContentLoaded', () => {
    let info = localStorage.getItem('DadosUsuario');
    let cpf = localStorage.getItem('DadosUsuario');
    cpf = JSON.parse(cpf);
    cpf = cpf.cpf;

    info = JSON.parse(info)
    const imgs = document.querySelector('#img');
    const imgTop = document.querySelector('#imgTop')
    if(info.img == null){

    } else{
        imgs.src = info.img
        imgTop.src = info.img
    }

    const nomes = document.querySelectorAll('.nomePerfil')
    const role =document.querySelectorAll('.rolePerfil')

    if(info.cnpj){
        role.forEach(rol =>{
            rol.textContent = 'Empresa'
        })
        nomes.forEach(nome =>{
            nome.textContent = info.razao
        })
    } else{
        role.forEach(rol =>{
            if(info.genero == 'F'){
                rol.textContent = "Trabalhadora"
            }else{
                rol.textContent = 'Trabalhador'
            }
        })
        nomes.forEach(nome =>{
            if(nome.id == 'testeImgPerfil'){
               nome.textContent = info.nome 
            }
            else{
            nome.textContent = info.nome + " "  + info.soobrenome

            }
        })
    }

    document.querySelector('#img').addEventListener('click', () => {
        const input = document.querySelector('#fileImg');
        input.click()
    })

    document.querySelector('#fileImg').addEventListener('change', async (e) => {
        const dadosImg = new FormData();
        const campoImg = e.target.files[0];
        dadosImg.append("image", campoImg);
        dadosImg.append("usuario", localStorage.getItem("DadosUsuario"));
        await fetch("/upload", {
            method:"POST",
            body: dadosImg
        })
        .then ( (resp) => {
            return resp.json();
        })
        .then( (dados) => {
            const containerImg = document.querySelector(".thumb-info.mb-md img");
            containerImg.setAttribute("src", dados.filePath);
            const dadosUser = JSON.parse(localStorage.getItem("DadosUsuario"));
            dadosUser.img = dados.filePath;
            localStorage.setItem("DadosUsuario", JSON.stringify(dadosUser));
        })
        .catch( (erro) => {
            alert("Erro: " + erro);
        })
    })
    buscaDados(cpf)

    document.querySelector('#altera').addEventListener('click', () => {
        atualizaDados(cpf);
    });

    


})

let sair = document.querySelectorAll('.logOut');
   sair.forEach(s => {
        s.addEventListener('click',()=>{
            logOut()
        })
   })

function logOut(){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "Sucesso",
        title: "Saindo da conta ..."
      });
    localStorage.removeItem('DadosUsuario')
    window.open('/','_self')
}


function atualizaDados(cpf) {
    let dados = {
        cpf: cpf,
        biografia: document.getElementById('profileBio').value,
        nome: document.getElementById('profileFirstName').value,
        soobrenome: document.getElementById('profileLastName').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        cep: document.getElementById('cep').value,
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value

    }
    const dadosString = JSON.stringify(dados);
    fetch('/atualizaDadosUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dadosString
    })
        .then(res => res.json())
        .then(resJson => {
            Swal.fire({
                text: `Dados Atualizados com Sucesso!!`,
                icon: "success"
            }).then(() =>{
                salvaLocalStorage(cpf);
            })
            .then(() => {
                window.location.reload();
            })
        })
        .catch(erro => {
            Swal.fire({
                text: `Dados Não Foram Atualizados por conta de ${erro}, tente novamente!!`,
                icon: "error"
            });
        })
}
function buscaDados(cpf) {


    fetch(`/getClientePorCPF?cpf=${cpf}`)
        .then(res => res.json())
        .then(resJsonn => {

            const resJson = resJsonn.resposta[0];
            document.getElementById('profileBio').value = resJson.biografia;
            document.getElementById('bioLateral').textContent = resJson.biografia;
            document.getElementById('profileFirstName').value = resJson.nome;
            document.getElementById('profileLastName').value = resJson.soobrenome;
            document.getElementById('telefone').value = resJson.telefone;
            document.getElementById('celular').value = resJson.celular;
            document.getElementById('cep').value = resJson.cep;
            document.getElementById('estado').value = resJson.estado;
            document.getElementById('cidade').value = resJson.cidade;
            document.getElementById('rua').value = resJson.rua;
            document.getElementById('numero').value = resJson.numero;
            document.getElementById('bairro').value = resJson.bairro;
            document.getElementById('title').textContent = `Perfil de ${resJson.nome} ${resJson.soobrenome}`
        })
        .catch(erro => {
            console.log(erro);
        })

}
function buscaCEP(input) {
    var cep = input.value
    const estado = document.getElementById('estado');
    const cidade = document.getElementById('cidade');
    const rua = document.getElementById('rua');
    const numero = document.getElementById('numero');
    const bairro = document.getElementById('bairro');
    if (cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(res => res.json())
            .then(resJson => {
                estado.value = resJson.uf;
                cidade.value = resJson.localidade;
                bairro.value = resJson.bairro;
                rua.value = resJson.logradouro;
            })
            .catch(erro => {
                console.log(erro);

            })
    } else {
        estado.value = '';
        cidade.value = '';
        rua.value = '';
        numero.value = '';
        bairro.value = '';
    }
}
function formatacao(input){
    let formata = input.value.replace(/[^\d]/g, '');
    input.value = formata;
}
