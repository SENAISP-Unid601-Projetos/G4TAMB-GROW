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
function linkPessoa(){
	window.open("../pessoa/index.html");
}
function linkEmpresa(){
	window.open('../empresa/index.html')
}
