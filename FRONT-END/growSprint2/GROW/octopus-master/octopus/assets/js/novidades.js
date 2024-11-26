
window.addEventListener('DOMContentLoaded',()=> {
    fetch('/novidades')
        .then(res => {
            if(!res.ok) {
                throw new Error("Deu Ruim");
            }
            return res.json()
        })
        .then(resJson => {
            console.log(resJson);
            
			document.getElementById('qtdNovidades').textContent = resJson.resp.length;
            const vagas = resJson.resp;
            for(var i = 0; i < vagas.length; i++){
                var vagaAtual = vagas[i];
                

                let urlEmpresa = `cnpj=${vagaAtual.cnpj}`;
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
                                                            src="${vagaAtual.img}" style="border-radius: 0.2em;">
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
                                            <a href="/timeline/pages-calendar.html?${urlEmpresa}" style="cursor: pointer" id="nomeEmpresa"><i></i> ${vagaAtual.razao}</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pg-tab" style="width: 600px; margin-left: -5px;">
                                        <div id="popular" class="tab-pane active" style = "overflow : hidden">
                                            <div class="favoritar">
                                                <p><strong>Vaga Para: </strong>${vagaAtual.necessidade}</p>
                                                <div class="ico"><i class="fa fa-reply"
                                                        style="margin-right: 10px; cursor : pointer" onclick="copiaTexto(${vagaAtual.idvaga})" id="copiaTexto-${vagaAtual.id}" ></i>
                                                </div>
                                            </div>
                                            <p style = "overflow : hidden"><strong>Local: </strong>${vagaAtual.rua}, ${vagaAtual.numero}, ${vagaAtual.cidade}-${vagaAtual.estado}</p> <a href="tables-advanced.html?id=${vagaAtual.idvaga}"
                                                style="margin-top: -22px;">(Ver mais)</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    `;
                document.getElementById('container').innerHTML += html;
                
            }
		})
        .catch(erro => {
            console.log(erro);
            
        })
})

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