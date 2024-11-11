//CPF
function formatarCPF(input) {
    let cpf = input.value.replace(/\D/g, '');
    
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

