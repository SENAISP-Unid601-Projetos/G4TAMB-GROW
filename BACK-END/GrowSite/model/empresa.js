const psql = require('./connector');

async function contaEmpresas(){
    const conexao = psql.conexao();
    const resposta = await conexao.query(`SELECT COUNT(*) FROM EMPRESA`);
    conexao.end();
    return resposta.rows
}


async function cadastraEmpresa(dados) {
    const conexao = psql.conexao();
    let resultado;
    let finalizou = false;
    try {
        resultado = await conexao.query(`INSERT INTO EMPRESA (cnpj,razao,representante,cpf,telefone,celular,estado,
            cep,cidade,rua,numero,complemento,bairro,aceito_termos_de_condicao,email,senha,abertura,notificacoes,leis)
            values('${dados.cnpj}','${dados.razaoSocial}','${dados.name}','${dados.cpf}','${dados.confirmTelefone}',
            '${dados.confirmCelular}','${dados.estado}',${dados.cep},'${dados.cidade}', '${dados.endereco}',
             '${dados.numero}', '${dados.complemento}', '${dados.bairro}',  '${dados.termos}','${dados.email}', '${dados.password}' ,
             '${dados.dataAbertura}','${dados.notificacoes}','${dados.leis}')
            `)
            finalizou = true;
    } catch(erro){
        console.log('Erro');
        console.log(erro);
        resultado = erro
    }
    conexao.end();
    return {mensagem : finalizou, retorno : resultado};
}



//login
async function loginEmpresa(dados) {
   const conexao = psql.conexao();
    let resultado;
   try {
       const retorno = await conexao.query(`SELECT * FROM EMPRESA WHERE email = '${dados.email}' AND senha = '${dados.password}'`);

        if (retorno.rows.length == 0) {
            throw "Nenhuma empresa encontrado!";
       }
        resultado = {
            sucesso: true,
            conteudo: retorno.rows
       }   
   }
   catch(erro) {
        resultado = {
            sucesso: false,
            motivoErro: erro
       }
    }
    conexao.end()
    return resultado;
}


// busca por email
async function buscaEmail(dados){ 
    const conexao = psql.conexao();
    let resultado;

    try {
        const retorno = await conexao.query(`SELECT * FROM EMPRESA WHERE email = '${dados.email}'`);
        if(retorno.rows.length == 0){
            throw "Nenhum Email Encontrado"
        }
        resultado = {
            sucesso : true,
            conteudo : retorno.rows
        }
    } catch(erro) { 
        resultado = {
            sucesso: false,
            motivoErro: erro
        }
    }
    conexao.end();
    return resultado
}
async function buscaPorCNPJ(dados) {
    const conexao =psql.conexao();
    let resposta;
    try { 
        const consulta = await conexao.query(`
                SELECT * FROM EMPRESA WHERE cnpj = '${dados.cnpj}'
            `)
        resposta = {
            sucesso : true,
            res : consulta.rows
        }
    } catch(erro) {
        resposta = {
            sucesso : false,
            res : erro
        }
    }
    conexao.end();
    return resposta
}
// vagas
async function criarUmaVaga(dados) {
    const conexao = psql.conexao();
    let resposta;
    try{
        const consulta = conexao.query(`
                insert into vaga ("necessidade","salario","carga_horaria","quantidade_de_vagas","descricao","beneficios","fk_cnpj_empresa")
                values('${dados.necessidade}',${dados.salario},'${dados.carga_horaria}',${dados.quantidade},'${dados.descricao}','${dados.beneficios}','${dados.cnpj}')
            `)
            resposta = {
                sucesso : true,
                retorno : consulta
            }
    } catch(erro){
        resposta = {
            sucesso : false,
            retorno : `Ocorreu o erro ${erro}`
        }
    }
    conexao.end();
    return resposta
}
async function getVagas() {
    const conexao = psql.conexao();
    let resultado = {
        resp: [],
        erro: null
    };

    try {
        const resposta = await conexao.query('SELECT * FROM VAGA ORDER BY ID ASC');
        resultado.resp = resposta.rows; // Armazenando as linhas da consulta
    } catch (erro) {
        resultado.erro = erro; // Armazenando o erro caso ocorra
    } finally {
        conexao.end(); // Garantir que a conexão seja fechada
    }

    return resultado; // Retorna um objeto com resp e erro
}
async function vagaPorEmpresa(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                SELECT * FROM VAGA WHERE fk_cnpj_empresa = '${dados.cnpj}'
            `);
            resposta = {
                sucesso : true,
                resp : consulta.rows
            }
    } catch(erro){
        resposta = {
            sucesso : false,
            resp : `Ocorreu o erro ${erro}`
        }
    }
    conexao.end();
    return resposta;
}

async function getVagaPorId(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                select * from vaga v
                inner join empresa e
                on v.fk_cnpj_empresa = e.cnpj
                where v.id = ${dados.idVaga};
            `);
            resposta = {
                sucesso : true,
                resp : consulta.rows
            }
    } catch(erro){
        resposta = {
            sucesso : false,
            resp : `Ocorreu o erro ${erro}`
        }
    }
    conexao.end();
    return resposta;
}
async function contaCandidatos(dados) {
    const conexao = psql.conexao();
    let resposta; 
    try {
        const consulta = await conexao.query(`
                select count(fk_usuario_cpf) from vaga
                inner join usuario_vaga on (vaga.id = usuario_vaga.fk_id_vaga)
                where fk_cnpj_empresa = '${dados.cnpj}'
            `)
            resposta = {
                sucesso : true,
                resp : consulta.rows
            }
    } catch (erro) {
        resposta ={
            sucesso : false,
            resp : erro
        }
    }
    conexao.end();
    return resposta
}
async function buscaVagasPorCNPJ(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
            select * from vaga as v
            inner join empresa as e on
            v.fk_cnpj_empresa = e.cnpj
            where e.cnpj = '${dados.cnpj}'    
        `)
        resposta = {
            sucesso : true,
            resp : consulta.rows
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
async function excluirVaga(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
                DELETE FROM VAGA WHERE ID = ${dados.id}
            `)
            resposta = {
                sucesso : true,
                resp : consulta
            }
    } catch(erro) {
        resposta = {
            sucesso : false,
            resp : erro
        }
    }
    conexao.end();
    return resposta
}
async function usuariosPorVaga(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const queryCount = await conexao.query(`
                        select count (*) from(
            select vaga.fk_cnpj_empresa as cnpj,
                    vaga.id as id_vaga,
                    usuario_vaga.fk_usuario_cpf as cpf
            from vaga 
            inner join usuario_vaga on (vaga.id = usuario_vaga.fk_id_vaga)
            inner join usuario on (usuario.cpf = usuario_vaga.fk_usuario_cpf)
            where vaga.fk_cnpj_empresa = '${dados.cnpj}'
            )   
        `)
        const queryResp = await conexao.query(`
                                    select vaga.fk_cnpj_empresa as cnpj,
                    vaga.id as id_vaga,
                    vaga.necessidade as necessidade,
                    usuario_vaga.fk_usuario_cpf as cpf,
                    usuario_vaga.id as id_usuario_vaga,
                    usuario.nome as nome,
                    usuario.soobrenome as sobrenome,
                    usuario.img as img,
                    usuario.email as email,
                    usuario.genero as genero,
                    usuario.rua as rua,
                    usuario.numero as numero,
                    usuario.cidade as cidade,
                    usuario.estado as estado,
                    usuario.datanascimento as data_nascimento
            from vaga 
            inner join usuario_vaga on (vaga.id = usuario_vaga.fk_id_vaga)
            inner join usuario on (usuario.cpf = usuario_vaga.fk_usuario_cpf)
            where vaga.fk_cnpj_empresa = '${dados.cnpj}'
        `)
        resposta = {
            sucesso : true,
            respCount : queryCount.rows,
            respDados : queryResp.rows
        }
    } catch(erro) {
        resposta = {
            sucesso : false,
            respErro : erro
        }
    }
    conexao.end();
    return resposta
}
async function contratar(dados){
    const conexao = psql.conexao();
    let resposta;
    try{
        const consultaDeRetorno = await conexao.query(`
                                select 
                usuario.email as email_usuario,
                usuario.nome as nome,
                vaga.necessidade as necessidade,
                vaga.fk_cnpj_empresa as cnpj,
                empresa.razao as razao,
                empresa.email as email_empresa
            from usuario_vaga
            inner join usuario on (usuario_vaga.fk_usuario_cpf = usuario.cpf)
            inner join vaga on (usuario_vaga.fk_id_vaga = vaga.id)
            inner join empresa on (empresa.cnpj = vaga.fk_cnpj_empresa)
            where usuario_vaga.id = ${dados.id}
        `)
        const consultaDeApagar = await conexao.query(`
                DELETE FROM USUARIO_VAGA
                WHERE ID = ${dados.id}
        `)
        resposta = {
            sucesso : true,
            respSelect : consultaDeRetorno.rows,
            respDelete : consultaDeApagar
        }
    } catch(erro){
        resposta = {
            sucesso : false,
            resp: erro
        }
    }
    conexao.end();
    return resposta
}
async function editarVaga (dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
            UPDATE VAGA
            SET necessidade = '${dados.necessidade}', 
            salario = '${dados.salario}',   
            carga_horaria = '${dados.carga_horaria}',
            quantidade_de_vagas = '${dados.quantidade}',
            descricao = '${dados.descricaoVaga}',
            beneficios = '${dados.beneficios}'
            WHERE ID = ${dados.id}
        `)
        resposta = {
            sucesso : true,
            mensagem : 'Vaga Aualizada Com Sucesso',
            resp : consulta
        }
    } catch (error) {
        resposta = {
            sucesso : false,
            mensagem : 'Vaga Não Foi Atualizada',
            resp : error
        }
    }
    conexao.end();
    return resposta;
}
async function contaVagas () {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
            SELECT COUNT (*) FROM VAGA    
        `)
        resposta = {
            sucesso : true,
            resp : consulta.rows
        }
    } catch (error) {
        resposta = {
            sucesso : false,
            resp : error
        }
    }
    conexao.end();
    return resposta
}
async function alterarDescricao(dados) {
    const conexao = psql.conexao();
    let resposta;
    try {
        const consulta = await conexao.query(`
            UPDATE EMPRESA
            SET descricaoEmpresa = '${dados.descricao}'
            WHERE cnpj = '${dados.cnpj}'    
        `);
        resposta = {
            sucesso : true,
            mensagem : "Descrição Alterada com Sucesso",
            resp : consulta
        }
    } catch (error) {
        resposta = {
            sucesso : false,
            mensagem : "Descrição Não Foi Alterada",
            resp: error
        }
    }
    conexao.end();
    return resposta;
}
exports.alterarDescricao = alterarDescricao;
exports.contaVagas = contaVagas;
exports.editarVaga = editarVaga;
exports.contratar = contratar;
exports.usuariosPorVaga = usuariosPorVaga;
exports.excluirVaga = excluirVaga;
exports.buscaVagasPorCNPJ = buscaVagasPorCNPJ;
exports.contaCandidatos = contaCandidatos;
exports.vagaPorEmpresa = vagaPorEmpresa;
exports.buscaPorCNPJ = buscaPorCNPJ;    
exports.getVagas = getVagas;
exports.criarUmaVaga = criarUmaVaga;
exports.cadastraEmpresa = cadastraEmpresa;
exports.loginEmpresa = loginEmpresa;
exports.buscaEmail = buscaEmail;
exports.contaEmpresas = contaEmpresas;
exports.getVagaPorId = getVagaPorId;