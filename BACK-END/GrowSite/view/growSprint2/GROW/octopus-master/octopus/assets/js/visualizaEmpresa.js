window.addEventListener('DOMContentLoaded',()=> {
    let dadosUsuario = localStorage.getItem('DadosUsuario');
    dadosUsuario = JSON.parse(dadosUsuario);
    let cnpj = window.location.href;
    cnpj = cnpj.split('?')[1];
    cnpj = atob(cnpj);
    cnpj = cnpj.split('=')[1];
    
    let dados = {
        cnpj : cnpj
    }
    dados = JSON.stringify(dados);
    fetch('/buscaEmpresaPorCNPJ', {
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
            const resposta = resJson.res[0];
            if(resposta.img != null) {
                document.querySelector('#img').src = resposta.img;
            }
            if(dadosUsuario.img != null) {
                document.querySelector('#imgTop').src = dadosUsuario.img;
            }
            if(dadosUsuario.genero == 'M') {
                document.querySelector('#roleTop').textContent = "Trabalhador";
            } else {
                document.querySelector('#roleTop').textContent = "Trabalhadora";
            }
            document.querySelector('#nomePerfil').textContent = dadosUsuario.nome + dadosUsuario.soobrenome;

            if (resposta && resposta.razao) {
                let iniciais = resposta.razao.split(' ')
                                          .map(palavra => palavra.charAt(0) + ".")
                                          .join('');
                document.getElementById('nomeEmoresa').textContent = iniciais;
            }

            document.getElementById('enederecoptUm').textContent = `${resposta.rua}, ${resposta.numero}, ${resposta.bairro}`
            document.getElementById('enederecoptDois').textContent = `${resposta.cidade}-${resposta.estado}`;
            
            document.getElementById("telefone").textContent = (resposta.telefone).replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
            // document.getElementById('celular').textContent = (resposta.celular).replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
            document.getElementById('email').textContent = resposta.email;
            document.getElementById('nome').innerHTML += resposta.razao;
            document.getElementById('representante').innerHTML += `<strong>Representante Legal: </strong>${resposta.representante}`;
            let datas = resposta.abertura;
            datas = datas.split('T')[0];
            let[ano, mes, dia] = datas.split('-')
             datas = `${dia}/${mes}/${ano}`;
            document.getElementById('dataAbertura').innerHTML += `<strong>Data de Abertura: </strong>${datas}`;

            if(resposta.descricao != null) {
                document.getElementById('descricao').textContent = resposta.descricao
                
            } else {
                console.log(resposta);
                document.getElementById('descricao').textContent = 'A Empresa Não Tem Descrição.'
            }

        })
        .catch(erro => {
            console.log(erro);
            
        })
})