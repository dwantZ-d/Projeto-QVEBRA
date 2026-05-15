const form = document.getElementById("cadastroForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("novoEmail").value.trim().toLowerCase();
  const senha = document.getElementById("novaSenha").value;

  fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: "Usuário",
      email,
      senha,
      telefone: "000000000",
      rua: "Não informado",
      estado: "RS",
      numero: "0",
      cidade: "Pelotas"
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);

    alert("Conta criada com sucesso!");
    window.location.href = "iniciar.html";
  })
  .catch(err => {
    console.error(err);
    alert("Erro ao conectar com a API");
  });
});