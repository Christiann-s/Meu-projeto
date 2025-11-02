document.getElementById('loginBtn').addEventListener('click', () => {
  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (usuario && email && senha) {
    alert(`Bem-vindo, ${usuario}! Login efetuado com sucesso.`);
  } else {
    alert('Por favor, preencha usuário, e-mail e senha.');
  }
});

document.getElementById('cadastroBtn').addEventListener('click', () => {
  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  if (usuario && email && senha) {
    alert(`Cadastro realizado!\nUsuário: ${usuario}\nE-mail: ${email}`);
  } else {
    alert('Preencha todos os campos para se cadastrar.');
  }
});

document.getElementById('menuBtn').addEventListener('click', () => {
  alert('Menu em desenvolvimento...');
});