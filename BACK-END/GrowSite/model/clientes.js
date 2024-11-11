const psql = require("./connector.js");

async function getClientes() {
    const conexao = psql.conexao();
    const retorno = await conexao.query("SELECT * FROM USUARIO");
    conexao.end()
    return retorno.rows;
}
async function getClientePorCPF(cpf) {
    const conexao = psql.conexao();
    let retorno;
    try {
        const consulta = await conexao.query(`SELECT * FROM USUARIO WHERE cpf = '${cpf}'`);
        retorno = { sucesso: true, resposta: consulta.rows };
    }
    catch (erro) {
        retorno = {
            erro: erro,
            sucesso: false
        }
    }
    conexao.end();
    return retorno;
}
async function contaClientes() {
    const conexao = psql.conexao();
    const retorno = await conexao.query(`SELECT COUNT(*) FROM USUARIO`);
    conexao.end();
    return retorno.rows;
}


async function cadastraCliente(dados) {
    const conexao = psql.conexao();
    let resultado;
    let finalizou = false;
    try {
        resultado = await conexao.query(`INSERT INTO USUARIO(cpf,nome,soobrenome,email,telefone,senha,genero,estado,cep,cidade,rua,numero,complemento,bairro,aceito_termos_de_condicao,receber_notificacoes,receber_emails,estado_civil,como_soube_do_site,celular,datanascimento)
            values('${dados.cpf}', '${dados.firstname}', '${dados.lastname}', '${dados.email}', '${dados.confirmTelefone}', '${dados.password}', 
            '${dados.genero}', '${dados.estado}', ${dados.cep}, '${dados.cidade}','${dados.endereco}', ${dados.numero}, 
            '${dados.complemento}', '${dados.bairro}', '${dados.termos}', '${dados.notificacoes}','${dados.receberEmails}',
            '${dados.estadoCivil}','${dados.soubeSite}','${dados.confirmCelular}','${dados.dataNascimento}')
        `);
        finalizou = true;
    }
    catch (erro) {
        console.log("Deu ruim!");
        console.log(erro);
        resultado = erro;
    }
    conexao.end();
    console.log(finalizou)
    console.log(resultado);
    return { sucesso: finalizou, retorno: resultado };
}

//login
async function loginClientes(dados) {
    const conexao = psql.conexao();
    let resultado;
    try {
        const retorno = await conexao.query(`SELECT * FROM USUARIO WHERE email = '${dados.email}' AND senha = '${dados.password}'`);

        if (retorno.rows.length == 0) {
            throw "Nenhum usuário encontrado!";
        }
        resultado = {
            sucesso: true,
            conteudo: retorno.rows
        }
    }
    catch (erro) {
        resultado = {
            sucesso: false,
            motivoErro: erro
        }
    }
    conexao.end()
    return resultado;
}

// busca por email
async function buscaEmail(dados) {
    const conexao = psql.conexao();
    let resultado;

    try {
        const retorno = await conexao.query(`SELECT * FROM USUARIO WHERE email = '${dados.email}'`);
        if (retorno.rows.length == 0) {
            throw "Nenhum Email Encontrado"
        }
        resultado = {
            sucesso: true,
            conteudo: retorno.rows
        }
    } catch (erro) {
        resultado = {
            sucesso: false,
            motivoErro: erro
        }
    }
    conexao.end();
    return resultado
}
// atualiza dados
async function atualizaDados(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                UPDATE USUARIO
                SET nome = '${dados.nome}',
                soobrenome = '${dados.soobrenome}',
                telefone = '${dados.telefone}',
                celular = '${dados.celular}',
                cep = ${dados.cep},
                estado = '${dados.estado}',
                cidade = '${dados.cidade}',
                bairro = '${dados.bairro}',
                rua = '${dados.rua}',
                numero = ${dados.numero},
                biografia = '${dados.biografia}'
                WHERE cpf = '${dados.cpf}'
            `)
        resposta = {
            sucesso: true,
            retorno: consulta
        }
    }
    catch (erro) {
        resposta = {
            sucesso: false,
            retorno: erro
        }
    }
    conexao.end();
    return resposta;
}

// vaga
async function candidatar(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                insert into usuario_vaga("fk_usuario_cpf","fk_id_vaga")
                values('${dados.cpf}', ${dados.idVaga})

            `)
        resposta = {
            sucesso: true,
            resp: consulta
        }
    } catch (erro) {
        resposta = {
            sucesso: false,
            resp: `Ocorreu o erro ${erro}`
        }
    }
    conexao.end();
    return resposta;
}

async function checaInscricao(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                select count(*) from usuario_vaga as qtd
                 where fk_usuario_cpf = '${dados.cpf}'
                and fk_id_vaga = ${dados.idVaga}
            `)
        resposta = {
            sucesso: true,
            resp: consulta.rows
        }
    } catch (erro) {
        resposta = {
            sucesso: false,
            resp: erro
        }
    }
    conexao.end();
    return resposta;
}
async function candidaturas(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
        SELECT 
            VAGA.NECESSIDADE,
            VAGA.DESCRICAO,
            VAGA.SALARIO,
            VAGA.CARGA_HORARIA,
            EMPRESA.img as img,
            EMPRESA.cidade AS cidade,
            EMPRESA.estado AS estado,
            EMPRESA.razao AS razao,
            USUARIO_VAGA.ID AS idVaga
        FROM 
            VAGA
            INNER JOIN 
            USUARIO_VAGA ON VAGA.ID = USUARIO_VAGA.FK_ID_VAGA
            INNER JOIN 
            EMPRESA ON VAGA.FK_CNPJ_EMPRESA = EMPRESA.CNPJ
            WHERE 
                USUARIO_VAGA.FK_USUARIO_CPF = '${dados.cpf}';
            `)
        resposta = {
            sucesso: true,
            resp: consulta.rows
        }
    } catch (erro) {
        resposta = {
            sucesso: false,
            resp: erro
        }
    }
    conexao.end();
    console.log(resposta.resp);
    return resposta;
}
// remover candidatura
async function removeCandidatura (dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = conexao.query(`
                delete from usuario_vaga where id = ${dados.id}
            `)
        resposta = {
            sucesso : true,
            resp : consulta
        }
    } catch (erro) {
        resposta = {
            sucesso : false,
            resp : erro
        }
    }
    conexao.end();
    return resposta;
}

//Salvar
async function salvarVaga(dados) {
        const conexao = await psql.conexao();
        let resposta;

        try {
            let consulta = await conexao.query(`SELECT * FROM FAVORITOS WHERE fk_id_vaga = ${dados.idVaga} AND fk_cpf_usuario = '${dados.cpf}'`);

            if (consulta.rows.length > 0) {
                throw "Vaga já foi favoritada!";
            }
            consulta = await conexao.query(
                `INSERT INTO favoritos (fk_id_vaga, fk_cpf_usuario) VALUES (${dados.idVaga}, '${dados.cpf}')`
            )
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
            return resposta;
        }
}

async function desfavoritarVaga(dados) {
    const conexao = await psql.conexao();
    let resposta;

    try {
        consulta = await conexao.query(
            `DELETE FROM FAVORITOS WHERE fk_id_vaga = ${dados.idVaga} AND fk_cpf_usuario = '${dados.cpf}'`
        )
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
        return resposta;
    }
}

async function verVagasSalvas(dados) {
    const conexao = await psql.conexao();
    let resposta;

    try {
        consulta = await conexao.query(
            `SELECT * FROM FAVORITOS WHERE fk_cpf_usuario = '${dados.cpf}'`
        )
        resposta = {
            sucesso: true,
            resp: consulta.rows,
        };
    } catch (erro) {
        resposta = {
            sucesso: false,
            resp: `Ocorreu o erro ${erro}`,
        };
    } finally {
        await conexao.end();
        return resposta;
    }
}

exports.removeCandidatura = removeCandidatura;
exports.candidaturas = candidaturas;
exports.salvarVaga = salvarVaga;
exports.checaInscricao = checaInscricao;
exports.candidatar = candidatar;
exports.atualizaDados = atualizaDados;
exports.getClientePorCPF = getClientePorCPF;
exports.loginClientes = loginClientes;
exports.getClientes = getClientes;
exports.cadastraCliente = cadastraCliente;
exports.buscaEmail = buscaEmail;
exports.contaClientes = contaClientes;
exports.desfavoritarVaga = desfavoritarVaga;
exports.verVagasSalvas = verVagasSalvas;