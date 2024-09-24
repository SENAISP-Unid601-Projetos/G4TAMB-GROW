    function inputCEP(valor){
    let cep = valor.value;
    cep = cep.replace(/\D/g,"");
    valor.value = cep;

    const cidade = document.querySelector('#cidade');
    const estado = document.querySelector('#estado');
    const bairro = document.querySelector('#bairro');
    const logradouro = document.querySelector('#enderço');
    const mensagem = document.querySelector('#mensagemCEP');
    //const inputCep = document.querySelector('#cep');
    

    if(cep.length == 8){
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(resposta => resposta.json())
            .then((respostaJson) => {
                console.log(respostaJson);
                if(respostaJson.erro){
                    mensagem.textContent = 'CEP Inválido, verifique e tente novamente';
                    valor.style.background = 'rgba(254, 128, 120,0.1)'
                }else{
                
                    cidade.value = respostaJson.localidade;
                    estado.value = respostaJson.uf;
                    bairro.value = respostaJson.bairro;
                    logradouro.value = respostaJson.logradouro;
                 
                }
            })
            .catch(erroRequisicao => {
                console.log(erroRequisicao);
                alert("Ops, Ocorreu um Erro!!, verifique o seu CEP!")
            })
    } else{
        cidade.value = "";
        estado.value = "";
        bairro.value = '';
        logradouro.value = '';
        valor.style.backgroundColor = "white";
        mensagem.textContent = '';
    }
}
