let cnpj = localStorage.getItem('DadosUsuario');
cnpj = JSON.parse(cnpj);
cnpj = cnpj.cnpj;

let vagas;
let candidatos;

let dados = {
    cnpj : cnpj
}
dados = JSON.stringify(dados);

fetch('/vagaPorEmpresa', {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body : dados
})
    .then(res => res.json())
    .then(resJson =>{
        console.log(resJson.resp.length);
        vagas = resJson.resp.length;
        document.getElementById('anuncioss').textContent = vagas;
        document.getElementById('qtd').textContent = vagas;
    })
    .catch(erro =>{
        console.log(erro);
        
    })

    fetch('/contaCandidatos', {
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
            console.log();
            
            candidatos = resJson.resp[0].count;
            document.getElementById('candidatoss').textContent = candidatos;
        })
        .catch(erro => {
            console.log(erro);
            
        })


