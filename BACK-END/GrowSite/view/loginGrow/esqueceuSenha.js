var senha;
window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        const email = document.getElementById('email');
        const dados = {
            email: email.value
        }
        const dadosString = JSON.stringify(dados);
        console.log(dadosString);

        fetch('/checaporEmail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: dadosString
        })
            .then(res => res.json())
            .then(dados => {
                console.log(dados);
                const respostas = dados.resposta;
                var respostasFiltradas = respostas.filter(resposta => resposta.qtd == '1');
                console.log(respostasFiltradas);
                if (respostasFiltradas == '') {
                     Swal.fire({
                        icon: "error",
                        title: "E-mail não encontrado",
                        text: "Verifique se você colocou o mesmo e-mail que você realizou o cadastro",
                        //footer: '<a href="#">Why do I have this issue?</a>'
                      });


                } else if (respostasFiltradas[0].tipo == 'usuario') {
                    const obj = {
                        email: email.value
                    }
                    fetch('/buscaporEmail', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: dadosString
                    })
                        .then(res => res.json())
                        .then(resJson => {
                            fetch('/emailRecuperaSenha',{
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(obj)
                            })
                            .then(res => res.json())
                            .then(data =>{
                                console.log(data);
                            })
                            .catch(erro =>{
                                console.log(erro);
                                
                            })
                            Swal.fire({
                                //title: "!",
                                text: `Enviamos um e-mail de recuperação de senha para você! `,
                                icon: "success"
                              });
                        })
                        .catch(erro => {
                            console.log(erro);
                        })
                } else if (respostasFiltradas[0].tipo == 'empresa') {
                    fetch('/buscaporEmailEmpresa', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: dadosString
                    })
                        .then(res => res.json())
                        .then(resJson => {
                           
                            const obj = {
                                email : email.value
                            }
                            const objString = JSON.stringify(obj)
                            fetch('/emailRecuperaSenha',{
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body:objString
                            })
                            .then(res => res.json())
                            .then(data =>{
                                console.log(data);
                            })
                            .catch(erro =>{
                                console.log(erro);
                                
                            })

                            Swal.fire({
                                //title: "!",
                                text: `Enviamos um e-mail de recuperação de senha para você! `,
                                icon: "success"
                              });

                        })
                        .catch(erro => {
                            console.log(erro);
                        })
                }
            })
            .catch(erro => {
                console.log(erro);
            }) 
    })  
})