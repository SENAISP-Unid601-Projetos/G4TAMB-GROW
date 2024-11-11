
window.addEventListener('DOMContentLoaded',()=> {
	carregaVagas()
})

async function carregaVagas() {
	let cpf = localStorage.getItem('DadosUsuario')
		cpf = JSON.parse(cpf);
		cpf = cpf.cpf
		let dados = {
			cpf : cpf
		}
	dados = JSON.stringify(dados)
		await fetch('/candidaturas', {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : dados
		})
			.then(res => {
				if(!res.ok){
					throw new Error('Deu Ruim')
				}
				return res.json()
			})
			.then(resJson =>{
				
				if(resJson.sucesso == true) {
					document.querySelector('#numeroDeCandidaturas').textContent = resJson.resp.length; 
					montaVaga(resJson.resp)
					
				}
			})
			.catch(erro => {
				console.log(erro);
				
			})
}
function montaVaga(vagas) {
	for(var i = 0; i < vagas.length; i++){
		var vagaAtual = vagas[i];
		console.log(vagaAtual);
		let html = `
			<div class="row" id="pg-6">
								<div class="col-md-6" id="pg-6">
									<div class="row mt-lg pt-lg">
									<div class="col-md-3">
										<section class="panel">
											<div class="panel-body pg" style="margin-left: -60px;width: 200px; height: 200px;">
												<div class="owl-carousel" data-plugin-carousel data-plugin-options='{ "items": 1, "autoHeight": true }'>
													<div class="item">
														<img alt="" class="img-responsive" src="${vagaAtual.img}" style="margin-top: 0px;">
													</div>
													<!-- <div class="item">
														<img alt="" class="img-responsive" src="assets/images/projects/project-2.jpg">
													</div>
													<div class="item">
														<img alt="" class="img-responsive" src="assets/images/projects/project-4.jpg">
													</div> -->
												</div>
											</div>
										</section>
									</div>
								</div>
									<div class="tabs">
										<ul class="nav nav-tabs">
											<li class="active">
												<a href="#popular" data-toggle="tab"><i></i>${vagaAtual.razao}s</a>
											</li>
										</ul>
										<div class="tab-content" id="pg-tab" style="width: 600px; margin-left: -5px;">
											<div id="popular" class="tab-pane active">
												<div class="favoritar"><p>${vagaAtual.necessidade}</p></div>
												<p><strong>Local: </strong>${vagaAtual.cidade} ${vagaAtual.estado}</p>
												<p><strong>Salário: </strong> R$${vagaAtual.salario}</p> 
												<div style="display: flex;
												justify-content: right;
												align-items: center;">
												<button class="entraremcontato" onclick="removerCandidatura(${vagaAtual.idvaga})">Remover Candidatura</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
		`
		document.querySelector('#container').innerHTML += html
	}
}

async function removerCandidatura(idVaga) {
	let dados = {
		id : idVaga
	}
	dados = JSON.stringify(dados)
	await fetch('/deletarCandidatura', {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : dados
	})
		.then(res => {
			if(!res.ok){
				throw new Error('Deu Ruim')
			}
			return res.json()
		})
		.then(resJson => {
			window.location.reload();
			console.log(resJson);
		})
		.catch(erro => {
			console.log(erro);
			
		})
}
