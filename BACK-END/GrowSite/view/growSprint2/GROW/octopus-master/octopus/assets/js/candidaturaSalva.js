window.addEventListener("DOMContentLoaded", () => {
    fetch("/verVagas", 
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    cpf: JSON.parse(localStorage.getItem("DadosUsuario")).cpf
                }
            )
        }
    )
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return res.json();
    })
    .then( dados => {
        for (let i = 0; i < dados.resp.length; i++) {
            let vagaAtual = document.querySelector(`i#salvaVaga-${dados.resp[i].fk_id_vaga}`);
            console.log(vagaAtual);
        }
    })
    .catch( erro => {
        console.log(erro);
    })
})