function validarFormulario() {
    var telefoneInput = document.getElementById('telefone');
    var formatoValido = /\([0-9]{2}\) 9[0-9]{4}-[0-9]{4}|\([0-9]{2}\) [2-5]{1}[0-9]{3}-[0-9]{4}/.test(telefoneInput.value);

    if (!formatoValido) {
        document.getElementById('formatoValido').style.display = 'none';
        document.getElementById('formatoInvalido').style.display = 'block';
        event.preventDefault(); // Impede o envio do formulário se o formato não for válido
    }
}