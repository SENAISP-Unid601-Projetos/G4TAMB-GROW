window.addEventListener('DOMContentLoaded',()=>{
   let idVaga = atob(window.location.href.split('&')[1]).split('id_vaga_usuario=')[1];
    let cpf = window.location.href.split('?')[1];
        cpf = cpf.split('&')[0]
        cpf = atob(cpf);
        cpf = cpf.split('cpf=')[1];    
    
        mostraPost(cpf)
    
        fetch(`/getClientePorCPF?cpf=${cpf}`)
        .then(res => {
            if(!res.ok) { 
                throw new Error('Deu Ruim')
            }
            return res.json()
        })
        .then(resJson => {
            if(resJson.sucesso == true){
                const resposta = resJson.resposta[0]
                if(resposta.img != null){
                    document.getElementById('img').src = resposta.img
                }
                if(resposta.genero == 'F') {
                    document.getElementById('role').textContent = 'Candidata'
                } else {
                    document.getElementById('role').textContent = 'Candidato'
                }
                document.getElementById('testeImgPerfil').textContent = resposta.nome;
                document.getElementById('bioLateral').textContent = resposta.biografia;
                let telefone = resposta.telefone;
                telefone = telefone.split('')
                telefone = `(${telefone[0]}${telefone[1]}) ${telefone[2]}${telefone[3]}${telefone[4]}${telefone[5]}-${telefone[6]}${telefone[7]}${telefone[8]}${telefone[9]}`
                let celular = resposta.celular.split('');
                celular = `(${celular[0]}${celular[1]}) ${celular[2]}${celular[3]}${celular[4]}${celular[5]}${celular[6]}-${celular[7]}${celular[8]}${celular[9]}${celular[10]}`
                
                let data_nascimento = resposta.datanascimento.split('T')[0];
                data_nascimento = data_nascimento.split('-')
                data_nascimento = `${data_nascimento[2]}/${data_nascimento[1]}/${data_nascimento[0]}`
                
                const dadosLocal = JSON.parse(localStorage.getItem('DadosUsuario'))
                console.log(dadosLocal);
                
                document.getElementById('telefone').textContent = telefone;
                document.getElementById('celular').textContent = celular;
                document.getElementById('nome').innerHTML += `<strong>Nome: </strong> ${resposta.nome} ${resposta.soobrenome}`
                document.getElementById('dataNascimento').innerHTML += `<strong>Data de Nascimento</strong> ${data_nascimento}`
                document.getElementById('endereco').innerHTML += `<strong>Endereço: </strong> ${resposta.rua}, ${resposta.numero}, ${resposta.cidade} ${resposta.estado}`
                document.getElementById('nomePerfil').textContent = dadosLocal.razao
                if(dadosLocal.img != null){
                    document.getElementById('imgTop').src = dadosLocal.img
                }
                
            }
        })
        .catch(erro => {
            console.log(erro);
            
        })
    document.getElementById('contrata').addEventListener('click',()=>{
        contratar(idVaga)
    })
    document.getElementById('dispensa').addEventListener('click',()=>{
        dispensar(idVaga)
    })
})



function contratar(id) {
    fetch(`/contratar?id=${id}`,{
       method : 'POST',
       headers : {
           'Content-Type' : 'application/json'
       }
    })
        .then(res => {
            if(!res.ok) {
                throw new Error('Deu Ruim')
            }
            return res.json()
        })
        .then(resJson => {
            if(resJson.sucesso == true) {
                enviaEmail(resJson.respSelect[0],'contrato')
                Swal.fire({
                   title: "Contratado",
                   text: "Candidato Contratado com Sucesso",
                   icon: "success"
                   }).then(()=>{
                    window.location.href = '/timeline/ui-elements-progressbars.html'
                   })
                
            }
        })
        .catch(erro => {
            console.log(erro);
           
        })
}
function dispensar(id){
   fetch(`/contratar?id=${id}`,{
       method : 'POST',
       headers : {
           'Content-Type' : 'application/json'
       }
    })
        .then(res => {
            if(!res.ok) {
                throw new Error('Deu Ruim')
            }
            return res.json()
        })
        .then(resJson => {
            if(resJson.sucesso == true) {
               enviaEmail(resJson.respSelect[0],'dispensa')
                Swal.fire({
                   title: "Dispensado",
                   text: "Candidato dispensado com Sucesso",
                   icon: "success"
                   }).then(()=>{
                    window.location.href = '/timeline/ui-elements-progressbars.html'
                   });

            }
        })
        .catch(erro => {
            console.log(erro);
           
        })
}

function enviaEmail(objEmail, tipo){
   let obj;
   if(tipo == 'contrato') {
       obj = {
               email_usuario : objEmail.email_usuario,
               assunto : `E-mail a Respeito da Vaga para ${objEmail.necessidade} na Empresa ${objEmail.razao}`,
               texto : `<p>Olá ${objEmail.nome}, a <strong>Grow Business</strong> Gostaria de Informar que você foi aprovado para a Vaga de
                       ${objEmail.necessidade} na Empresa <strong>${objEmail.razao}</strong>. Para mais informações entre em contato pelo 
                       E-mail: ${objEmail.email_empresa}
                       </p>`,
               email_empresa : objEmail.email_empresa
           }
   } else if(tipo == 'dispensa') {
       obj = {
           email_usuario : objEmail.email_usuario,
           assunto : `E-mail a Respeito da Vaga para ${objEmail.necessidade} na Empresa ${objEmail.razao}`,
           texto : `<p>Olá ${objEmail.nome}, a <strong>Grow Business</strong> informa que você, infelizmente, <strong>não foi aprovado</strong> para a Vaga de
                   ${objEmail.necessidade} na Empresa <strong>${objEmail.razao}</strong>. Que tal dar uma olhada em outros anúcios no Site da Grow!
                   
                   </p>`,
           email_empresa : objEmail.email_empresa
       }
   }

    
   obj = JSON.stringify(obj)
   fetch('/emailContratacao', {
       method : 'POST',
       headers : {
           'Content-Type' : 'application/json'
       },
       body : obj
   })
       .then(res => {
           if(!res.ok){
               throw new Error('Deu Ruim')
           }
           return res.json()
       })
       .then(resJson =>{
           console.log(resJson);
       })
       .catch(erro =>{
           console.log(erro);
           
       })
}   

function mostraPost(cpf){
fetch(`/getPostsPorCPF?cpf=${cpf}`)
				.then(res => {
					if(!res.ok) {
						throw new Error('Deu Ruim')
					}
					return res.json();
				})
				.then(res =>{
					if(res.sucesso == true) {
						const container = document.getElementById('containerr')
						const posts = res.resp
						posts.forEach(post => {
							let html = `
								                    <li>
														<div class="tm-box">
															<p class="text-muted mb-none">${post.data_postagem}</p>
															<p>
																${post.texto}
															</p>
														</div>
													</li>
							
							` ;
							container.innerHTML += html
						});
					}
					
				})
				.catch(erro => {
					console.log(erro);
					
				})
}