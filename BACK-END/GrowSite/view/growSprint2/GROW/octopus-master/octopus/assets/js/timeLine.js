window.addEventListener('DOMContentLoaded', () => {

    fetch('/getVagas')
        .then(res => {
            if (!res.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return res.json();
        })
        .then(resJson => {
            criaVagas(resJson.resp)
            document.getElementById('numAnuncios').textContent = resJson.resp.length;
        })
        .catch(erro => {
            console.error('Erro ao fazer a requisição:', erro);
        });

		fetch('/novidades')
        .then(res => {
            if(!res.ok) {
                throw new Error("Deu Ruim");
            }
            return res.json()
        })
        .then(resJson => {
			console.log(resJson.resp.length);
			document.getElementById('qtdNovidades').textContent = resJson.resp.length;
		})
        .catch(erro => {
            console.log(erro);
            
        })



}) 
function criaVagas(vagas) {
	const funcionarioAtual = JSON.parse(localStorage.DadosUsuario);

        for (var i = 0; i < vagas.length; i++) {
            const vagaAtual = vagas[i];
			console.log(vagaAtual);
			
            const cnpjEmpresa = vagaAtual.fk_cnpj_empresa;
            let dadosDaEmpresa
            let dados = {
                cnpj : cnpjEmpresa
            }
            
            dados = JSON.stringify(dados);

            fetch('/buscaEmpresaPorCNPJ', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : dados
            })
                .then(res =>res.json())
                .then(resJson => {
                    dadosDaEmpresa = resJson.res[0]
					
					let urlEmpresa = `cnpj=${dadosDaEmpresa.cnpj}`;
					urlEmpresa = btoa(urlEmpresa)


                    let html = `<div class="row" id="pg-6">
							<div class="col-md-6" id="pg-6">
								<div class="row mt-lg pt-lg">
									<div class="col-md-3">
										<section class="panel">
											<div class="panel-body pg" style="margin-left: -60px;">
												<div class="owl-carousel" data-plugin-carousel
													data-plugin-options='{ "items": 1, "autoHeight": true }'>
													<div class="item">
														<img alt="" class="img-responsive"
															src="${dadosDaEmpresa.img}" style="border-radius: 0.2em;">
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
											<a href="/timeline/pages-calendar.html?${urlEmpresa}" style="cursor: pointer" id="nomeEmpresa"><i></i> ${dadosDaEmpresa.razao}</a>
										</li>
									</ul>
									<div class="tab-content" id="pg-tab" style="width: 600px; margin-left: -5px;">
										<div id="popular" class="tab-pane active" style = "overflow : hidden">
											<div class="favoritar">
												<p><strong>Vaga para: </strong>${vagaAtual.necessidade}</p>
												<div class="ico"><i class="fa fa-reply"
														style="margin-right: 10px; cursor : pointer" onclick="copiaTexto(${vagaAtual.id})" id="copiaTexto-${vagaAtual.id}" ></i><i
														style="margin-right: 10px;"></i><i id="salvaVaga-${vagaAtual.id}" style="cursor: pointer" class="fa fa-bookmark" onclick="favoritarVaga(this, '${vagaAtual.id}', '${funcionarioAtual.cpf}')"></i>
												</div>
											</div>
											<p style = "overflow : hidden"><strong>Local: </strong>${dadosDaEmpresa.bairro}, ${dadosDaEmpresa.bairro}, ${dadosDaEmpresa.rua}, ${dadosDaEmpresa.numero}</p> <a href="tables-advanced.html?id=${vagaAtual.id}"
												style="margin-top: -22px;">(Ver mais)</a>
										</div>
									</div>
								</div>
								
							</div>
						</div>
                    `;
                    
                    const conteiner = document.getElementById('container')
                    conteiner.innerHTML += html;

                })
                .catch(erro => {
                    console.log(erro);
                    
                })   
        }

		fetch("/verVagas", 
			{
				method:"POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(
					{
						cpf: JSON.parse(localStorage.getItem("DadosUsuario")).cpf
					}
				)
			}
		)
		.then(res => {
			if (!res.ok) {
				throw new Error('Erro na resposta do servidor');
			}
			return res.json();
		})
		.then( dados => {
			for (let i = 0; i < dados.resp.length; i++) {
				let vagaAtual = document.querySelector(`i#salvaVaga-${dados.resp[i].fk_id_vaga}`);
				vagaAtual.style.color = "rgb(255, 213, 59)";
			}
		})
		.catch( erro => {
			console.log(erro);
		})
}

function pesquisarEmpresa() {
	const campoPesquisa = document.getElementById("itemPes");
	const cardsVagas = document.querySelectorAll("#pg-6");

	cardsVagas.forEach( (vaga) => {
		const textoVaga = vaga.textContent.trim().toLowerCase();
		const textoPesquisa = campoPesquisa.value.trim().toLowerCase();
		const filtroBusca = new RegExp(textoPesquisa, "gi");

		if (textoVaga.match(filtroBusca) == null) {
			vaga.style.display = "none";
		}
		else {
			vaga.style.display = "";
		}
	})
}



function copiaTexto(idVaga) {
	navigator.clipboard.writeText(`http://localhost:8080/timeline/tables-advanced.html?id=${idVaga}`);
	Swal.fire({
		position: "top-end",
		icon: "success",
		title: "Vaga Copiada com Sucesso!",
		showConfirmButton: false,
		timer: 1500
	  });
	  
}
