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

    // Formatação do CEP (XXXXX-XXX) apenas se o CEP tiver 8 dígitos
    if (cep.length === 8) {
        cep = cep.replace(/(\d{5})(\d{3})/, "$1-$2");
        valor.value = cep;

        const url = `https://viacep.com.br/ws/${cep.replace('-', '')}/json/`; // Retira o hífen da URL
        fetch(url)
            .then(resposta => resposta.json())
            .then((respostaJson) => {
                if (respostaJson.erro) {
                    mensagem.textContent = 'CEP Inválido, verifique e tente novamente';
                    valor.style.background = 'rgba(254, 128, 120,0.1)';
                } else {
                    // Preenche os campos com os dados da API
                    cidade.value = respostaJson.localidade;
                    estado.value = respostaJson.uf;
                    bairro.value = respostaJson.bairro;
                    logradouro.value = respostaJson.logradouro;
                    mensagem.textContent = '';  // Limpa mensagem de erro
                    valor.style.background = ''; // Remove o fundo de erro
                }
            })
            .catch(erroRequisicao => {
                console.log(erroRequisicao);
                alert("Ops, ocorreu um erro! Verifique o seu CEP.");
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
