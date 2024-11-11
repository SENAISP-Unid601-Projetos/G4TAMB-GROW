
function formatarCNPJ(input) {
    let cpf = input.value.replace(/\D/g, '');
    var cnpj = cpf;

    if (cpf.length > 0 && cpf.length < 14) {
        const mensagem = document.querySelector('#mensagemCPF');
        mensagem.textContent = '';
        input.style.backgroundColor = 'white';
    }

    if (cpf.length > 10) {
        cpf = cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    else if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4");
    } else if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{2})(\d{3})/, "$1.$2");
    } else if (cpf.length > 0) {
        cpf = cpf.replace(/(\d{2})/, "$1");
    }

    input.value = cpf;
    if (cnpj.length == 14) {
        console.log(cnpj);
        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
            .then(resposta => resposta.json())
            .then(dados => {
                console.log(dados.data_inicio_atividade);
                const data = document.querySelector('#dataAbertura');
                const razao = document.querySelector('#razaoSocial');
                const tel = document.querySelector('#confirmTelefone');
                const cep = document.querySelector('#cep');
                const descricao = document.querySelector('#tipo');
                const numero = document.querySelector("#numero");


                data.value = dados.data_inicio_atividade;
                razao.value = dados.razao_social;
                tel.value = (dados.ddd_telefone_1).replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
                descricao.value = dados.descricao_tipo_de_logradouro;
                numero.value = dados.numero;

                var cepNumerico = dados.cep;
                fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`)
                    .then(resposta => resposta.json())
                    .then(respostaJson => {
                        const cidade = document.querySelector('#cidade');
                        const estado = document.querySelector('#estado');
                        const bairro = document.querySelector('#bairro');
                        const logradouro = document.querySelector('#endereco');
                        const mensagem = document.querySelector('#mensagemCEP');
                        const valor = document.querySelector('#cep')

                        if (respostaJson.erro) {
                            mensagem.textContent = 'CEP Inválido, verifique e tente novamente';
                            valor.style.background = 'rgba(254, 128, 120, 0.1)';
                        } else {

                            cidade.value = respostaJson.localidade;
                            estado.value = respostaJson.uf;
                            bairro.value = respostaJson.bairro;
                            logradouro.value = respostaJson.logradouro;
                            mensagem.textContent = '';
                            valor.style.background = '';
                        }
                    })

                cep.value = (dados.cep).replace(/(\d{5})(\d{3})/, "$1-$2");
            })
    }

}