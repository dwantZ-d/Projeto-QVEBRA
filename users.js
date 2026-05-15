const formLogin = document.getElementById("loginForm");

formLogin.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.user) {

      
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      alert("Login realizado!");

      
      window.location.href = "index.html";

    } else {
      alert(data.message || "Email ou senha inválidos");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Erro no servidor");
  });
});

