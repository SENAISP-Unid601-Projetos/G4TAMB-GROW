const express = require("express");
const path = require("path");
const fs = require("fs");
const clientes = require("./model/clientes");
const empresa = require("./model/empresa");
const geral = require('./model/gerais');
const services = require('./services/emais');
const porta = 8080;

const pastaModel = path.join(__dirname, "model");
const pastaView = path.join(__dirname, "view");
const pastaControl = path.join(__dirname, "control");
const viewGrow = path.join(pastaView, "SiteGrow");
const viewEmpresa = path.join(pastaView, "empresa");
const viewPessoa = path.join(pastaView, "pessoa");
const viewLoginGrow = path.join(pastaView, "loginGrow");
const viewSprint2 = path.join(pastaView, "growSprint2");
const viewPasta = path.join(pastaView, "GROW");
const viewOctopusMaster = path.join(pastaView, "octopus-master");
const viewOctopus = path.join(pastaView, "octopus");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(pastaModel));
app.use(express.static(pastaView));
app.use(express.static(pastaControl));
app.use(express.static(viewGrow));
app.use(express.static(viewEmpresa));
app.use(express.static(viewPessoa));
app.use(express.static(viewLoginGrow));
app.use(express.static(viewSprint2));
app.use(express.static(viewPasta));
app.use(express.static(viewOctopusMaster));
app.use(express.static(viewOctopus));

// Iniciando servidor
app.listen(porta, () => {
    console.log("Iniciando Express na porta " + porta);
})

// Rotas
app.get("/", function (req, res) {
    const paginaInicial = fs.readFileSync("./view/SiteGrow/index.html", "utf-8");
    res.send(paginaInicial);
});
app.get('/login', function (req, res) {
    const login = fs.readFileSync('./view/loginGrow/index.html', 'utf-8');
    res.send(login);
});

// Simplificação da rota /timeline para servir o arquivo como estático
app.use('/timeline', express.static(path.join(__dirname, 'view/growSprint2/GROW/octopus-master/octopus')));

// APIs gerais
app.post('/loginGeral', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await geral.qualLogin(dados);
        res.json(resposta);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno do servidor.' });
    }
});
app.post('/checaporEmail', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await geral.checaporEmail(dados);
        res.json(resposta);
    } catch (erro) {
        console.log(erro);
        res.status(500).json({ sucesso: false, mensagem: 'Erro do Servidor' });
    }
});

// Usuários
app.get('/listaUsuarios', async (req, res) => {
    const lista = await clientes.getClientes();
    res.json(lista);
});

app.post('/cadastraUsuario', async (req, res) => {
    const dados = req.body;
    const resposta = await clientes.cadastraCliente(dados);
    res.status(resposta.sucesso === true ? 201 : 500).json({ sucesso: resposta });
});

app.post('/loginUsuario', async (req, res) => {
    const dados = req.body;
    const resposta = await clientes.loginClientes(dados);
    res.status(resposta.sucesso === true ? 200 : 404).json({ mensagem: resposta });
});

app.post('/buscaporEmail', async (req, res) => {
    const dados = req.body;
    const resposta = await clientes.buscaEmail(dados);
    res.status(resposta.sucesso === true ? 200 : 404).json({ mensagem: resposta });
});
app.get('/contaClientes', async (req, res) => {
    const lista = await clientes.contaClientes();
    res.json(lista);
});
app.get('/getClientePorCPF', async(req,res)=>{
    const dados = req.query.cpf;
    const resposta = await clientes.getClientePorCPF(dados);
    res.json(resposta)
})
app.post('/atualizaDadosUsuario', async(req,res)=>{
    const dados = req.body;
    const resposta = clientes.atualizaDados(dados);
    res.json(resposta);
})


// Empresa
app.post('/cadastraEmpresa', async (req, res) => {
    const dados = req.body;
    const resposta = await empresa.cadastraEmpresa(dados);
    res.status(resposta.mensagem === true ? 201 : 500).json({ mensagem: resposta });
});

app.post('/loginEmpresa', async (req, res) => {
    const dados = req.body;
    const resposta = await empresa.loginEmpresa(dados);
    res.status(resposta.sucesso === true ? 200 : 404).json({ mensagem: resposta });
});

app.post('/buscaporEmailEmpresa', async (req, res) => {
    const dados = req.body;
    const resposta = await empresa.buscaEmail(dados);
    res.status(resposta.sucesso === true ? 200 : 404).json({ mensagem: resposta });
});
app.get('/contaEmpresas', async (req, res) => {
    const lista = await empresa.contaEmpresas();
    res.json(lista);
});

// Recuperação de senha
app.post('/emailRecuperaSenha', (req, res) => {
    const obj = req.body;
    const resposta = services.enviaEmailSenha(obj);
    res.json(resposta);
});

app.post("/resetSenha", async (req, res) => {
    const dados = req.body;
    const resposta = await geral.resetSenha(dados);
    res.status(resposta.sucesso === true ? 200 : 404).json({ mensagem: resposta });
});

app.post('/enviaEmail', (req, res) => {
    const obj = req.body;
    const resposta = services.enviarEmailDuvida(obj);
    res.json(resposta);
});
