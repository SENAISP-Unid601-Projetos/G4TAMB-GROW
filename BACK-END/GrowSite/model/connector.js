const pg = require('pg');

function conexao() {
    const dados = {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: '25022007',
        database: 'GROW'
    };
    const con = new pg.Pool(dados);
    return con
}
exports.conexao = conexao;