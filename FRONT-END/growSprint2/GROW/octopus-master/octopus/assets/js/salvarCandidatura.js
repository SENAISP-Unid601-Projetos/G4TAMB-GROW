    window.addEventListener('DOMContentLoaded', () => {
        favoritarVaga();
    });

    async function favoritarVaga(botao, idVaga, cpfUsuario) {
        const url = botao.style.color == "rgb(255, 213, 59)" ? "/desfavoritarVaga":"/salvarVaga";
        const dadosRequisicao = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    idVaga: idVaga,
                    cpf: cpfUsuario
                }
            )
        }

        
        await fetch(url, dadosRequisicao)
        .then( (resp) => {
            return resp.json();
        })
        .then ( (dados) => {
            botao.style.color = url == "/salvarVaga" ? "rgb(255, 213, 59)":"rgb(119,119,119)"; 
        })
        .catch( (erro) => {
            console.log(erro);
        })
    }