window.addEventListener('DOMContentLoaded',()=>{
    const contaUsuarios = document.getElementById('usuarioConta');
    const contaEmpresas = document.getElementById('empresaConta');

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
})