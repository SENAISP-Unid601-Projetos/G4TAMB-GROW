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
            cep,cidade,rua,numero,complemento,bairro,aceito_termos_de_condicao,descricao,email,senha,abertura,notificacoes,leis)
            values('${dados.cnpj}','${dados.razaoSocial}','${dados.name}','${dados.cpf}','${dados.confirmTelefone}',
            '${dados.confirmCelular}','${dados.estado}',${dados.cep},'${dados.cidade}', '${dados.endereco}',
             ${dados.numero}, '${dados.complemento}', '${dados.bairro}',  '${dados.termos}', '' ,'${dados.email}', '${dados.password}' ,
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
        const resposta = await conexao.query('SELECT * FROM VAGA');
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