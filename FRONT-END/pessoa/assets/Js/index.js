function cadastraCliente(dados) {
    const jsonRequisicao = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: dados
    };
    fetch('/existeEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dados
    })
        .then(res => res.json())
        .then(resJson => {
            const resposta = resJson.info;
            
            if (resposta[0].count == 0) {
                fetch("/cadastraUsuario", jsonRequisicao)
                    .then((resp) => {
                        console.log(resp.status);
                        if (resp.status >= 400) {
                            return resp.json().then((errorData) => {
                                const objErro = errorData.sucesso.retorno;
                                if (objErro.code == "23505") {
                                    if (objErro.constraint == 'usuario_pkey') {
                                        document.querySelector('#mensagemCPF').textContent = 'Este CPF já está cadastrado';
                                    } else {
                                        document.getElementById(`mensagem${objErro.constraint}`).textContent = `${objErro.constraint} já 
                                 cadastrado
                             `
                                    }
                                }
                                throw new Error("Cadastro não foi feito!");
                            });
                        }
                        return resp.json();
                    })
                        
                    .then((data) => {
                         window.location.href = "/login";
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Esse E-mail já foi Cadastrado",
                  });
            }


        }

        )
        .catch(erro => {
            console.log(erro);
        })




}

function montaObjetoCadastro() {
    let strObj = "{";
    document.querySelectorAll("form input, form select").forEach((campo) => {
        if (campo.getAttribute("type") === "checkbox") {
            strObj += `"${campo.id}": "${campo.checked}",`;
        } else if (campo.getAttribute('id') == 'confirmaremail' || campo.getAttribute('id') == 'outro' || campo.getAttribute('id') == 'confirmPassword') {
            return;
        } else {
            strObj += `"${campo.id}": "${campo.value}",`;
        }
    });
    strObj = strObj.slice(0, (strObj.lastIndexOf(",")));
    strObj += "}";
    return strObj;
}

window.addEventListener("DOMContentLoaded", () => {
    const botaoCadastro = document.querySelector("body > div > div.form > div.continue-button > button");

    botaoCadastro.addEventListener("click", async () => {

        const elementos = document.querySelectorAll('[id*="mensagem"]');
        elementos.forEach(elemento => {
            elemento.textContent = '';
        })

        const inputsObrigatorios = document.querySelectorAll('.required input, .required select');
        var verifica = false;
        inputsObrigatorios.forEach(campo => {
            if (campo.getAttribute("type") != "checkbox" && campo.value == "") {
                campo.style.backgroundColor = 'rgba(254, 128, 120,0.1)';
                verifica = true;
            } else if (campo.getAttribute("type") == "checkbox" && campo.checked == false) {
                campo.parentElement.style.textDecoration = 'underline';
                verifica = true;
            }
        });

        const confirmaEmail = document.querySelector('#confirmaremail');
        const email = document.querySelector('#email');
        if (email.value != confirmaEmail.value) {
            verifica = true;
            alert('Email diferente do Confirmado!');
        }

        const senha = document.querySelector("#password");
        const senhaVerificada = document.querySelector("#confirmPassword");
        if (senha.value != senhaVerificada.value) {
            verifica = true;
            alert("Senha diferente da confirmada!");
        }

        if (senha.value.length < 8) {
            alert('A senha deve conter 8 caracteres');
        }

        if (!verifica) {
            // Gerando JSON
            let dadosCliente = JSON.parse(montaObjetoCadastro());
            dadosCliente.cpf = dadosCliente.cpf.replace(/[^\d]/gi, "");
            dadosCliente.cep = dadosCliente.cep.replace(/[^\d]/gi, "");
            dadosCliente.confirmCelular = dadosCliente.confirmCelular.replace(/[^\d]/gi, "");
            dadosCliente.confirmTelefone = dadosCliente.confirmTelefone.replace(/[^\d]/gi, "");
            dadosCliente.termos = dadosCliente.termos == "true" ? "S" : "N";
            dadosCliente.receberEmails = dadosCliente.email == "true" ? "S" : "N";
            dadosCliente.notificacoes = dadosCliente.notificacoes == "true" ? "S" : "N";
            dadosCliente = JSON.stringify(dadosCliente);
            await cadastraCliente(dadosCliente);
        }
    });
});
