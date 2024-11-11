    //CPF
    function validateCPF(strOriginal) {
            const mensagem = document.querySelector('#mensagemCPF');
            const campoCpf = document.querySelector("#cpf");
            let strCPF = (strOriginal.value).replace(/[^\d]+/g, "");
            let primeiroChar = strCPF[0];
            let stringRegex = `${primeiroChar}{11}`;
            let regexFinal = RegExp(stringRegex);
            let Soma;
            let Resto;
            Soma = 0;
            
            if (strCPF.search(regexFinal) != -1) {
            strOriginal.style.background = 'rgba(254, 128, 120,0.1)';
                mensagem.textContent = 'CPF Inválido, verifique e tente novamente!';
                campoCpf.value = "";
            }
            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(strCPF.substring(9, 10))) {
                strOriginal.style.background = 'rgba(254, 128, 120,0.1)';
                mensagem.textContent = 'CPF Inválido, verifique e tente novamente!'
                campoCpf.value = "";
            }
            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;
            if ((Resto == 10) || (Resto == 11)) Resto = 0;
            if (Resto != parseInt(strCPF.substring(10, 11))) {
                strOriginal.style.background = 'rgba(254, 128, 120,0.1)';
                mensagem.textContent = 'CPF Inválido, verifique e tente novamente!'
                campoCpf.value = "";
        }
    }

    function formatarCPF(input) {
        let cpf = input.value.replace(/\D/g, '');

        if(cpf.length > 0 && cpf.length < 14){
            const mensagem = document.querySelector('#mensagemCPF');
            mensagem.textContent = '';
            input.style.backgroundColor = 'white';
        }


        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{3})/, "$1.$2");
        } else if (cpf.length > 0) {
            cpf = cpf.replace(/(\d{3})/, "$1");
        }

        input.value = cpf;
    }

    //Telefone fixo
     function formatarTEL(input) {
        let confirmTelefone = input.value.replace(/[^\d]/g, '');

        if (confirmTelefone.length > 6) {
            confirmTelefone = confirmTelefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
            input.value = confirmTelefone;
        }
        else if (confirmTelefone.length > 2) {
            confirmTelefone = confirmTelefone.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
            input.value = confirmTelefone;
        }
    }

    //Celular
    function formatarCEL(input) {
        let confirmCelular = input.value.replace(/[^\d]/g, '');

        if (confirmCelular.length > 7) {
            confirmCelular = confirmCelular.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
            input.value = confirmCelular;
        }
        else if (confirmCelular.length > 2) {
            confirmCelular = confirmCelular.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
            input.value = confirmCelular;
        }
    }
//validarData
function validarData(){
    var data = document.getElementById("dataNascimento").value; //pega o valor do input
    data = data.replace(/\//g, "-"); // substitui eventuais barras (ex. IE) "/" por hífen "-"
    var data_array = data.split("-"); // quebra a data em array
    
    // para o IE onde será inserido no formato dd/MM/yyyy
    if(data_array[0].length != 4){
       data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // remonto a data no formato yyyy/MM/dd
    }
    
    // comparo as datas e calculo a idade
    var hoje = new Date();
    hoje.setHours(0,0,0,0);
   
    var nasc  = new Date(data);
    var idade = hoje.getUTCFullYear() - nasc.getUTCFullYear();
    var m = hoje.getUTCMonth() - nasc.getUTCMonth();
        
    if (m < 0 || (m === 0 && hoje.getUTCDate() < nasc.getUTCDate())) idade--;
    
    const span = document.querySelector('#mensagemData');
    const inpData = document.querySelector('#dataNascimento');
    if(idade < 18){

        span.textContent = "Você deve ser maior de idade";
        
        inpData.style.background = "rgba(254, 128, 120,0.1)";
        return false;
    }
    
    if(idade >= 18 && idade <= 102){
        inpData.style.backgroundColor = "white";
        span.textContent ="";
        return true;
    }
    if(idade > 102){
        span.textContent = "Você ultrapassou a idade limite de cadastro!"
        inpData.style.background = "rgba(254, 128, 120,0.1)";
        return false
    } else{
        span.textContent = 'Data Inválida!'
        inpData.style.background = "rgba(254, 128, 120,0.1)";
    }
    
    // se for maior que 60 não vai acontecer nada!
    return false;
    }
 
function formatacao(input){
    let formata = input.value.replace(/[^\d]/g, '');
    input.value = formata
}