const express = require("express");
const path = require("path");
const fs = require("fs");
const clientes = require("./model/clientes");
const empresa = require("./model/empresa");
const geral = require('./model/gerais');
const psql = require("./model/connector");
const services = require('./services/emais');
const multer = require("multer"); // Importando multer para upload de arquivos
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
const uploadImages = path.join(__dirname, "assets", "upload_imgs");

const app = express();

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/upload_imgs'); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo com sufixo único
    }
});

const upload = multer({ storage: storage });
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
app.use('/assets/upload_imgs', express.static(uploadImages));
if (!fs.existsSync(uploadImages)) {
    console.log("Não existe: Criando!");
    fs.mkdirSync(uploadImages, { recursive: true });
}


// Middlewares // Servir arquivos de upload como estáticos
// Rota para fazer o upload da imagem


app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Nenhuma imagem foi enviada.' });
    }
    const caminhoImagem = `/assets/upload_imgs/${req.file.filename}`;
    const conexao = psql.conexao();
    const documentoUser = JSON.parse(req.body.usuario);
    console.log(documentoUser);
    let query = `
    SELECT * FROM ((SELECT CPF, IMG, 'USUARIO' AS "TIPO_USUARIO" FROM USUARIO)
    UNION (SELECT CNPJ, IMG, 'EMPRESA' AS "TIPO_EMPRESA" FROM EMPRESA)) AS CADASTRADOS
    WHERE CPF = '${Object.keys(documentoUser).indexOf("cnpj") != -1 ? documentoUser.cnpj : documentoUser.cpf}';
    `;
    console.log(query);
    let consulta = await conexao.query(query);
    console.log(consulta.rows[0]);
    query = `
    UPDATE ${consulta.rows[0]["TIPO_USUARIO"]}
    SET IMG = '${caminhoImagem}' WHERE 
    ${consulta.rows[0]["TIPO_USUARIO"] == "USUARIO" ? "CPF" : "CNPJ"} = 
    '${Object.keys(documentoUser).indexOf("cnpj") != -1 ? documentoUser.cnpj : documentoUser.cpf}'
    `
    consulta = await conexao.query(query);
    console.log(consulta.rows[0]);

    conexao.end();

    res.send({
        message: 'Imagem enviada com sucesso!',
        filePath: caminhoImagem
    });
});

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

app.post('/existeEmail', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await geral.existeEmail(dados);
        res.json(resposta)
    } catch (erro) {
        res.status(500).json({ sucesso: false, mensagem: 'Erro do Servidor' })
    }
})

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
app.get('/getClientePorCPF', async (req, res) => {
    const dados = req.query.cpf;
    const resposta = await clientes.getClientePorCPF(dados);
    res.json(resposta)
})
app.post('/atualizaDadosUsuario', async (req, res) => {
    const dados = req.body;
    const resposta = clientes.atualizaDados(dados);
    res.json(resposta);
})
app.post('/candidatar', async (req, res) => {
    const dados = req.body;
    try{
        const resposta = await clientes.candidatar(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/checaInscricao', async (req,res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.checaInscricao(dados)
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/deletarCandidatura', async (req, res) =>{
    const dados = req.body;
    try {
        const resposta = await clientes.removeCandidatura(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/contaCandidatos', async (req,res) => {
    const dados = req.body;
    try {
        const resposta = await empresa.contaCandidatos(dados)
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
//salvar
app.post('/salvarVaga', async (req,res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.salvarVaga(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})

app.post('/desfavoritarVaga', async (req,res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.desfavoritarVaga(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.get('/novidades', async (req,res) => {
    try {
        const resposta = await clientes.recentes();
        res.json(resposta);
    } catch (error) {
        res.json(error)
    }
})
app.post('/verVagas', async (req,res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.verVagasSalvas(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/postar', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.postar(dados);
        res.json(resposta)
    }catch(erro) {
        res.json(erro)
    }
})
app.get('/getPostsPorCPF', async (req, res) => {
    const dados = req.query;
    try{
        const resposta = await clientes.getPostsPorCPF(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
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
app.post('/criarVaga', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await empresa.criarUmaVaga(dados);
        res.json(resposta);
    } catch (erro) {
        res.status(500).json({ erro: erro, mensagem: 'Erro no Servidor' })
    }
})
app.get('/getVagas', async (req, res) => {
    try {
        const resposta = await empresa.getVagas(); // Espera a resposta da função assíncrona
        res.json(resposta); // Envia a resposta para o cliente
    }
    catch (erro) {
        res.json({ sucesso: false, mensagem: erro.message }); // Envia o erro, se ocorrer
    }
});


app.get('/contaVagas', async (req, res) => {
    try {
        const resposta = await empresa.contaVagas();
        res.json(resposta);
    } catch (error) {
        res.json(error)
    }
})
app.get("/getVagaPorId", async (req, res) => {
    try {
        const dados = req.query;
        const resposta = await empresa.getVagaPorId(dados); // Espera a resposta da função assíncrona
        res.json(resposta); // Envia a resposta para o cliente
    }
    catch (erro) {
        res.json({ sucesso: false, mensagem: erro.message }); // Envia o erro, se ocorrer
    }
});
app.post('/atualizarVaga', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await empresa.editarVaga(dados);
        res.json(resposta)
    } catch (error) {
        res.json(error)
    }
});
app.post('/buscaEmpresaPorCNPJ', async (req, res) => {
    const dados = req.body;
    const resposta = await empresa.buscaPorCNPJ(dados);
    res.json(resposta)
})
app.post('/vagaPorEmpresa', async (req, res) => {
    const dados = req.body;
    const resposta = await empresa.vagaPorEmpresa(dados);
    res.json(resposta);
})
app.post('/candidaturas', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await clientes.candidaturas(dados)
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/buscaVagasPorCNPJ', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await empresa.buscaVagasPorCNPJ(dados);
        res.json(resposta)
    } catch (erro) {
        res.json(erro)
    }
})
app.post('/deletarVaga', async (req, res) => {
        const dados = req.query;
        try {
            const resposta = await empresa.excluirVaga(dados);
            res.json(resposta)
        } catch(erro) {
            res.json(erro)
        }
})
app.post('/usuarioPorVaga', async (req, res) => {
    const dados = req.body;
    try {
        const resposta = await empresa.usuariosPorVaga(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
app.post('/contratar', async (req,res) => {
    const dados = req.query;
    const resposta = await empresa.contratar(dados);
    res.json(resposta);
})
app.post('/alterarDescricao', async (req, res) => {
    const dados = req.body;
    try{
        const resposta = await empresa.alterarDescricao(dados);
        res.json(resposta)
    } catch(erro) {
        res.json(erro)
    }
})
// emails
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
app.post('/emailContratacao', (req, res) => {
    const obj = req.body;
    const resposta = services.emailContratacao(obj);
    res.json(resposta)
})
// Iniciando servidor
app.listen(porta, () => {
    console.log("Iniciando Express na porta " + porta);
})

