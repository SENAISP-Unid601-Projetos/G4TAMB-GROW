function inputCEP(valor) {
    let cep = valor.value;
    
    // Remove todos os caracteres que não são números
    cep = cep.replace(/\D/g, '');
    valor.value = cep;

    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');
    const bairro = document.querySelector('#bairro');
    const logradouro = document.querySelector('#endereco');
    const mensagem = document.querySelector('#mensagemCEP');

    // Só formata o CEP com o hífen se o CEP tiver 8 dígitos
    if (cep.length === 8) {
        // Remove o hífen para a consulta à API
        const cepSemHifen = cep.replace('-', '');

        // Formata o CEP com hífen para exibição
        valor.value = cep.replace(/(\d{5})(\d{3})/, "$1-$2");

        const url = `https://viacep.com.br/ws/${cepSemHifen}/json/`;
        fetch(url)
            .then(resposta => resposta.json())
            .then((respostaJson) => {
                console.log(respostaJson);
                if (respostaJson.erro) {
                    mensagem.textContent = 'CEP Inválido, verifique e tente novamente';
                    valor.style.background = 'rgba(254, 128, 120, 0.1)';
                } else {
                    // Preenche os campos com os dados da API
                    cidade.value = respostaJson.localidade;
                    estado.value = respostaJson.uf;
                    bairro.value = respostaJson.bairro;
                    logradouro.value = respostaJson.logradouro;
                    mensagem.textContent = ''; 
                    valor.style.background = ''; 
                }
            })
            .catch(erroRequisicao => {
                console.log(erroRequisicao);
            });
    } else {
        // Limpa os campos quando o CEP é inválido ou incompleto
        cidade.value = '';
        estado.value = '';
        bairro.value = '';
        logradouro.value = '';
        valor.style.backgroundColor = "white";
        mensagem.textContent = '';
    }
}

//CPF
function formatarCPF(input) {
    let cpf = input.value.replace(/\D/g, '');

    if(cpf.length > 0 && cpf.length < 14){
        const mensagem = document.querySelector('#mensagemCPF');
        mensagem.textContent = '';
        input.style.backgroundColor = 'white';
    }


    if (cpf.length > 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cpf.length > 6) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    } else if (cpf.length > 3) {
        cpf = cpf.replace(/(\d{3})(\d{3})/, "$1.$2");
    } else if (cpf.length > 0) {
        cpf = cpf.replace(/(\d{3})/, "$1");
    }

    input.value = cpf;
}