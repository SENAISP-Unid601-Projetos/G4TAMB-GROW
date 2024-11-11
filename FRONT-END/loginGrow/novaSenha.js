async function alteraSenha() {
    const email = `${window.location.href}`.split("?id=")[1];
    const senha = document.querySelector('#senha').value;
    const obj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            email: atob(email),
            novaSenha: senha
        })
    }
    await fetch("/resetSenha", obj)
    .then( (resp) => {
        if (resp.status >= 400) {
            throw resp.text();
        }
        return resp.json();
    })
    .then( (dados) => {
        Swal.fire({
            //title: "!",
            text: `Senha Alterada com Sucesso! `,
            icon: "success"
          });
        open("/login", "_self");
    })
    .catch( (erro) => {
        alert(`Senha não foi alterada!\nMotivo: ${erro}`);
    })
}


window.addEventListener('DOMContentLoaded',()=>{
    const btn = document.querySelector('#btn');
    btn.addEventListener('click',()=>{
        const senha = document.querySelector('#senha');
        const confirmarSenha = document.querySelector('#confirmarSenha');
        const mensagem = document.querySelector('#mensagem');

        if(senha.value == "" || confirmarSenha == ""){
            mensagem.textContent = 'Preencha todos os campos'
        } else if(senha.value.length < 8 || confirmarSenha.value.length < 8){
            mensagem.textContent = 'Senha deve conter 8 caracteres'
        } else if(senha.value != confirmarSenha.value){
            mensagem.textContent = 'A Senha deve ser a mesma nos dois Campos';
        } else{
            alteraSenha();
        }
    })
})