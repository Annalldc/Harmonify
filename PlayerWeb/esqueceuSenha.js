function enviarEmail() {
    var email = document.getElementById('email').value;
    var mensagemElemento = document.getElementById('mensagem');
    var emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (emailValido) {
      mensagemElemento.innerHTML = 'Um e-mail de redefinição foi enviado para ' + email;
    } else {
      mensagemElemento.innerHTML = 'Por favor, informe um endereço de e-mail válido.';
    }
  }