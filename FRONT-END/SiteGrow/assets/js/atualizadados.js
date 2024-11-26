window.addEventListener('DOMContentLoaded',()=>{
    const contaUsuarios = document.getElementById('usuarioConta');
    const contaEmpresas = document.getElementById('empresaConta');
    const vagasExistente = document.getElementById('vagasExistente');
    fetch('/contaClientes')
        .then(res => res.json())
        .then(resJson =>{
            
            contaUsuarios.textContent = resJson[0].count;
        })
        .catch(erro => {
            console.log(erro);
        })
    fetch('/contaEmpresas')
        .then(res => res.json())
        .then(resJson =>{
            contaEmpresas.textContent = resJson[0].count;
        })
        .catch(erro => {console.log(erro)})
    fetch('/contaVagas')
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            
            vagasExistente.textContent = resJson.resp[0].count
        })
    
})