const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

//links
function linkPessoa() {
	window.open("../pessoa/index.html");
}
function linkEmpresa() {
	window.open('../empresa/index.html')
}

//funcoes login
function loginUsuario(dados) {
	let resposta;
	fetch('/loginUsuario', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: dados
	})
		.then(res => res.json())
		.then(resJson => {
			resposta = resJson.mensagem.conteudo[0];
			localStorage.setItem ('DadosUsuario', JSON.stringify(resposta));
			window.location.href = "/timeline/ui-elements-tabs.html";
			
		})
		.catch(erro => {
			resposta = { mensagem: erro }
			console.log(resposta);
		})


}

function loginEmpresa(dados) {
	let resposta;
	fetch('/loginEmpresa', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"	
		},
		body: dados
	})
		.then(res => res.json())
		.then(resJson => {
			resposta = resJson.mensagem.conteudo[0];
			resposta = resJson.mensagem.conteudo[0];
			localStorage.setItem ('DadosUsuario', JSON.stringify(resposta))
			window.location.href = "/timeline/pages-500.html"
		})
}


document.getElementById('entrar').addEventListener('click', async () => {
	const email = document.getElementById('email');
	const senha = document.getElementById('password');
	const mensagemEmail = document.getElementById('mensagemEmail');
	const mensagemSenha = document.getElementById('mensagemSenha');
	mensagemEmail.textContent = '';
	mensagemSenha.textContent = '';

	if (email.value == '' && senha.value == '') {
		mensagemEmail.textContent = '* Insira seu E-mail';
		mensagemSenha.textContent = '* Insira sua Senha';
	} else if (email.value == '') {
		mensagemEmail.textContent = '* Insira seu E-mail';
	} else if (senha.value == '') {
		mensagemSenha.textContent = '* Insira sua Senha';
	}

	else {
		dados = {
			email: email.value,
			password: senha.value
		}
		const dadosString = JSON.stringify(dados)

		await fetch('/loginGeral', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: dadosString

		}
		)
			.then(res => {

				return res.json()
			})
			.then(data => {
				const arry = data.resposta;
				var item = arry.filter(item => item.qtd == '1')
				if (item == '') {
					Swal.fire({
                        icon: "error",
                        //title: "E-mail não encontrado",
                        text: "E-mail ou senha incorretos, verifique e tente novamente",
                        //footer: '<a href="#">Why do I have this issue?</a>'
                      });
				}

				if (item[0].tipo == 'usuario') {
					loginUsuario(dadosString)
				} else if (item[0].tipo == 'empresa') {
					loginEmpresa(dadosString)
				} else {
					alert(item[0])
				}

			})
			.catch(erro => {
				console.log(erro);

			})
	}
})
