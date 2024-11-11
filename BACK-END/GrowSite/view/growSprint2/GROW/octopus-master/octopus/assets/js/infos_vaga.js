const idVaga = window.location.href.split("?id=")[1];
async function getInfosVaga() {
    await fetch(`/getVagaPorId?idVaga=${idVaga}`)
        .then((resp) => {
            return resp.json();
        })
        .then((dados) => {
            montaHtml(dados)
        })
        .catch((erro) => {
            console.error(erro);
        })
}

window.addEventListener("DOMContentLoaded", () => {
    getInfosVaga();
    document.querySelector('#logOut').addEventListener('click', () => {
        localStorage.removeItem('DadosUsuario');
        window.open('/', '_self')
    })

    document.querySelector('#candidatar').addEventListener('click', () => {
        candidatar()
    })
})
function montaHtml(dados) {
    const resposta = dados.resp[0];
    document.querySelector('#nomeEmpresa').textContent = resposta.razao;
    document.querySelector('#necessidade').textContent = resposta.necessidade;
    document.querySelector('#img').src = resposta.img;
    document.querySelector('#titulo').textContent = `Vaga para ${resposta.necessidade} em ${resposta.razao}`
    document.querySelector('#local').innerHTML = `<strong>Local: </strong>  ${resposta.bairro}, ${resposta.rua}, ${resposta.numero}, ${resposta.cidade} ${resposta.estado}`;
    document.querySelector('#carga_horaria').innerHTML = `<strong>Carga Horaria: </strong> ${resposta.carga_horaria}`;
    document.querySelector('#descricao').innerHTML = `<strong>Descrição da Vaga: </strong> ${resposta.descricao}`;
    document.querySelector('#salario').innerHTML = `<strong>Salário Mensal: </strong> R$${resposta.salario}`;
    document.querySelector('#beneficios').innerHTML = `<strong>Benefícios: </strong> ${resposta.beneficios}`;
    document.querySelector('#qto').innerHTML = `<strong>Quantidade de Vagas: </strong> ${resposta.quantidade_de_vagas}`
}

async function candidatar() {
    let cpf = localStorage.getItem('DadosUsuario');
    cpf = JSON.parse(cpf);
    cpf = cpf.cpf;

    let obj = {
        cpf: cpf,
        idVaga: parseInt(idVaga)
    }
    obj = JSON.stringify(obj);

    await fetch('/checaInscricao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: obj
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Falhou!!')
            }
            return res.json()
        })
        .then(resJson => {
            if (resJson.sucesso == true && resJson.resp[0].count == 0) {
                
                fetch('/candidatar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: obj
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Falhou!!')
                        }
                        return res.json()
                    })
                    .then(resJson => {
                        if (resJson.sucesso == true) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Você foi Inscrito para a Vaga",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(erro => {
                        console.log(erro);

                    })




            } else if(resJson.resp[0].count != 0 && resJson.sucesso == true){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Você já está Inscrito para essa Vaga",
                    showConfirmButton: false,
                    timer: 1500
                });
            } 
            else {
                throw new Error('Falhou!')
            }
        })
        .catch(erro => {
            console.log(erro);

        })






}   