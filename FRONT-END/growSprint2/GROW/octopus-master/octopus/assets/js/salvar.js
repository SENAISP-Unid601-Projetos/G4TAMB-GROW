//Salvar
async function salvarVaga(dados) {
    const salva = document.getElementById("salvaVaga");

    salva.addEventListener("click", async function () {
        const conexao = await psql.conexao();
        let resposta;

        try {
            const consulta = await conexao.query(
                `INSERT INTO favoritos (fk_id_vaga, fk_usuario_cpf) VALUES (${dados.idVaga}, ${dados.cpf})`
            );

            resposta = {
                sucesso: true,
                resp: consulta,
            };
        } catch (erro) {
            resposta = {
                sucesso: false,
                resp: `Ocorreu o erro ${erro}`,
            };
        } finally {
            await conexao.end();
        }

        alert(resposta)
        return resposta;
    });
}