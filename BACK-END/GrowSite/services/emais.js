
// envia email de recuperacao de senha
function enviaEmailSenha(obj) {
    const id = new Buffer(obj.email).toString("base64");
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro provedor de e-mail
        auth: {
            user: 'grow.corporacao@gmail.com', // seu e-mail
            pass: 'c p p f t f r l k i j z c f k s' // sua senha
        }
    });
    const mailOptions = {
        from: 'Grow Corporação <grow.corporacao@gmail.com>', // remetente
        to: obj.email, // destinatário
        subject: 'Email de Recuperação de senha',
        html: `<p>Acesse esse link para <a href='http://10.141.129.47:8080/alterarSenha.html?id=${id}'>Alterar sua Senha da GROW</a></p>
        <p>Esse e-mail só é enviado se você solicitou, se você não requisitou apenas o igonre.</p>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar e-mail: ' + error);
        }
    })
}

function enviarEmailDuvida(obj) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou outro provedor de e-mail
        auth: {
            user: 'grow.corporacao@gmail.com', // seu e-mail
            pass: 'c p p f t f r l k i j z c f k s' // sua senha
        }
    });
    const mailOptions = {
        from: obj.email,
        to: 'grow.corporacao@gmail.com',
        subject: obj.assunto,
        text: `E-mail enviado por ${obj.nome} com o e-mail: ${obj.email}.\n ${obj.texto}`,
        replyTo: obj.email
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erro ao enviar e-mail: ' + error);
        }
    })
}
function emailContratacao(obj) {
    let resposta;
    try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'grow.corporacao@gmail.com',
                pass: 'c p p f t f r l k i j z c f k s'
            }
        });
        const mailOptions = {
            from: 'Grow Business <grow.corporacao@gmail.com>',
            to: obj.email_usuario,
            subject: obj.assunto,
            html: obj.texto,
            replyTo: obj.email_empresa
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erro ao enviar e-mail: ' + error);
            }
        })
        resposta = {
            sucesso : true,
            mensagem : 'email enviado com sucesso'
        }
    } catch (erro) {
        resposta = {
            sucesso : false,
            mensagem : erro
        }
    }
    return resposta;
}

exports.emailContratacao = emailContratacao;
exports.enviaEmailSenha = enviaEmailSenha;
exports.enviarEmailDuvida = enviarEmailDuvida;