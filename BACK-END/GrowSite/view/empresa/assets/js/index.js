async function cadastraEmpresa(dados) {
    const jsonRequisicao = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: dados
    }

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
                 fetch('/cadastraEmpresa', jsonRequisicao)
                    .then(res => {
                        if (res.status > 400) {
                            return res.json().then((erroData) => {
                                const objErro = erroData.mensagem.retorno;
                                if (objErro.code == '23505') {
                                    const mensagem = document.querySelector('#mensagemGeral');
                                    if (objErro.constraint == 'empresa_pkey') {
                                        document.querySelector('#mensagemcnpj').textContent = 'CNPJ já está Cadastrada'
                                        mensagem.textContent = 'CNPJ já cadastrada';
                                    } else if (objErro.constraint == 'empresaEmail') {
                                        document.querySelector('#mensagemEmail').textContent = 'E-mail já cadastrado';
                                        mensagem.textContent = 'E-mail já cadastrado';
                                    } else if (objErro.constraint == "empresaCpf") {
                                        document.querySelector('#mensagemCPF').textContent = 'CPF já cadastrado'
                                        mensagem.textContent = 'CPF já cadastrado';
                                    } else if (objErro.constraint == 'empresaTelefone') {
                                        document.querySelector('#mensagemTelefone').textContent = 'Telefone já cadastrado'
                                        mensagem.textContent = 'Telefone já cadastrado';
                                    } else if (objErro.constraint == 'empresaCelular') {
                                        document.querySelector('#mensagemCelular').textContent = 'Celular já cadastrado'
                                        mensagem.textContent = 'Celular já cadastrado';
                                    }
                                }

                                throw objErro;

                            })
                        }
                        return res.json()
                    })
                    .then(data => {
                        window.location.href = '/login'
                    })
                    .catch(erro => {
                        console.log(erro);
                    })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Esse E-mail já foi Cadastrado",
                  });
            }
        })



}

function montaObjetoCadastro() {
    let strObj = "{";
    let camposLeis = document.querySelectorAll("form input:not([id])");
    let todasLeis = camposLeis.length;
    let leisMarcadas = 0;
    document.querySelectorAll("form input[id], form select").forEach((campo) => {
        if (campo.getAttribute("type") === "checkbox" && (campo.getAttribute('id') == 'termos' || campo.getAttribute('id') == 'notificacoes')) {
            strObj += `"${campo.id}": "${campo.checked}",`;
        } else if (campo.getAttribute('id') == 'confirmaremail' || campo.getAttribute('id') == 'outro' || campo.getAttribute('id') == 'confirmPassword') {
            return
        }
        else {
            strObj += `"${campo.id}": "${campo.value}",`;
        }
    });
    camposLeis.forEach((lei) => {
        if (lei.checked === true) {
            leisMarcadas++;
        }
    })
    strObj = `${strObj}"leis": ${leisMarcadas === todasLeis ? "\"S\"" : "\"N\""}}`;
    //strObj = strObj.slice(0, (strObj.lastIndexOf(",")));
    //strObj += "}";
    return strObj;
}

window.addEventListener('DOMContentLoaded', () => {
    const botaoCadastro = document.querySelector("body > div > div.form > div.continue-button > button");

    botaoCadastro.addEventListener('click', async () => {

        const elementos = document.querySelectorAll('[id*="mensagem"]');
        elementos.forEach(elemento => {
            elemento.textContent = ''
        })

        const inputsObrigatorios = document.querySelectorAll('.required input');
        var verifica = false;
        inputsObrigatorios.forEach(campo => {
            if (campo.getAttribute("type") != "checkbox" && campo.value == "") {
                campo.style.backgroundColor = 'rgba(254, 128, 120,0.1)';
                verifica = true
            }
            else if (campo.getAttribute("type") == "checkbox" && campo.checked == false) {
                campo.parentElement.style.textDecoration = 'underline';
                verifica = true
            }
        });


        const senha = document.querySelector("#password");
        const senhaVerificada = document.querySelector("#confirmPassword");
        if (senha.value != senhaVerificada.value) {
            verifica = true;
            alert("Senha diferente da confirmada!")
        }
        if (senha.value.length < 8) {
            alert('A senha deve conter 8 caracteres')
        }

        if (verifica == false) {
            //Gerando JSON
            let dadosCliente = montaObjetoCadastro();
            dadosCliente = JSON.parse(dadosCliente);
            dadosCliente.cpf = dadosCliente.cpf.replace(/[^\d]/gi, "");
            dadosCliente.cep = dadosCliente.cep.replace(/[^\d]/gi, "");
            dadosCliente.cnpj = dadosCliente.cnpj.replace(/[^\d]/gi, "");
            dadosCliente.confirmCelular = dadosCliente.confirmCelular.replace(/[^\d]/gi, "");
            dadosCliente.confirmTelefone = dadosCliente.confirmTelefone.replace(/[^\d]/gi, "");
            dadosCliente.termos = dadosCliente.termos == "true" ? "S" : "N";
            dadosCliente.notificacoes = dadosCliente.notificacoes == "true" ? "S" : "N";
            dadosCliente = JSON.stringify(dadosCliente);
            await cadastraEmpresa(dadosCliente);
        }


    })

})