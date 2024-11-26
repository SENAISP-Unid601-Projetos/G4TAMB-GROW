function envia(objString) {    
    fetch('/enviaEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: objString
    })
        .then(res => {
             if(!res.ok){
                throw 'Email não enviado';
             } else{
                Swal.fire({
                    text: `Seu E-mail foi enviado, aguarde a resposta. `,
                    icon: "success"
                  });
             }
        })
        .catch(erro => {
            console.log(erro);
        })
}
window.addEventListener('DOMContentLoaded', () => {
    const botao = document.querySelector('#form-submit');
    botao.addEventListener('click', () => {
        const nome = document.querySelector('#name').value;
        const assunto = document.querySelector('#subject').value;
        const email = document.querySelector('#email').value;
        const texto = document.querySelector('#message').value;

        if(nome == '' || assunto == '' || email == '' || email == '' || texto == ''){

        } else{
            const obj = {
                email : email,
                nome : nome,
                assunto : `${assunto}`,
                texto : texto
            };   
            const objString = JSON.stringify(obj);
            envia(objString) 
        }
    })
})