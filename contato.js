document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".contato-form");
    const mensagem = document.querySelector(".mensagem-sucesso");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            mensagem.textContent = "Mensagem enviada com sucesso! ✅";
            form.reset();

            setTimeout(() => {
                mensagem.textContent = "Mensagem enviada com sucesso! ✅";
            }, 4000);
        });
    }

});



