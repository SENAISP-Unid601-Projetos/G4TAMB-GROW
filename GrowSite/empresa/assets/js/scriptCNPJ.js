
    function formatarCNPJ(valor){
        let cnpj = valor.value;
        cnpj = cnpj.replace(/\D/g,"");
        valor.value = cnpj;
        if(cnpj.length == 14){
            fetch(`https://brasilapi.com.br/api/cnpj/${cnpj}`)
                .then(resposta => resposta.json())
                .then(respostaJson => {
                    console.log(respostaJson)
                })
                .catch(erro => {"Erro: ",erro})


        }
    }