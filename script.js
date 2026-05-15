const buyBtn = document.getElementById("buyBtn");


if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    document.querySelector(".lancamentos")?.scrollIntoView({
      behavior: "smooth"
    });
  });
}

const search = document.getElementById("search");

if (search) {
  search.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      alert("Você buscou por: " + search.value);
    }
  });
}

/* ANIMAÇÃO */
const produtos = document.querySelectorAll(".produto");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

produtos.forEach(prod => {
  prod.style.opacity = 0;
  prod.style.transform = "translateY(40px)";
  prod.style.transition = "all 0.6s ease";
  observer.observe(prod);
});

/* CARRINHO */
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const cartCount = document.getElementById("cart-count");

function atualizarContador() {
  let total = 0;

  carrinho.forEach(p => {
    total += p.qtd || p.quantidade || 0;
  });

  if (cartCount) {
    cartCount.textContent = total;
  }
}

atualizarContador();

/* BOTÕES DE COMPRA (PÁGINA PRODUTOS) */
const botoes = document.querySelectorAll(".btn-comprar");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {

    const produto = {
      id: botao.dataset.id,
      nome: botao.dataset.nome,
      preco: Number(botao.dataset.preco),
      img: botao.dataset.img,
      qtd: 1
    };

    const existente = carrinho.find(p => p.id === produto.id);

    if (existente) {
      existente.qtd = (existente.qtd || 1) + 1;
    } else {
      carrinho.push(produto);
    }

    atualizarCarrinho();
    mostrarFeedback(produto.nome);
  });
});

/* FEEDBACK */
function mostrarFeedback(nome) {
  const msg = document.createElement("div");

  msg.textContent = nome + " adicionado ao carrinho 🛒";

  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.right = "20px";
  msg.style.background = "#111";
  msg.style.color = "#fff";
  msg.style.padding = "12px 20px";
  msg.style.borderRadius = "8px";
  msg.style.opacity = "0";
  msg.style.transition = "0.4s";
  msg.style.zIndex = "9999";

  document.body.appendChild(msg);

  setTimeout(() => msg.style.opacity = "1", 10);

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 400);
  }, 2000);
}

/* ABRIR / FECHAR CARRINHO */
const cartIcon = document.querySelector(".cart");
const cartMenu = document.getElementById("cart-menu");
const overlayCart = document.getElementById("overlay-cart");
const closeCart = document.getElementById("close-cart");

if (cartIcon) {
  cartIcon.addEventListener("click", abrirCarrinho);
}

if (closeCart) {
  closeCart.addEventListener("click", fecharCarrinho);
}

if (overlayCart) {
  overlayCart.addEventListener("click", fecharCarrinho);
}

function abrirCarrinho() {
  gerarSedex();
  renderizarCarrinho();
  atualizarTotal();

  cartMenu?.classList.add("active");
  overlayCart?.classList.add("active");
}

function fecharCarrinho() {
  cartMenu?.classList.remove("active");
  overlayCart?.classList.remove("active");
}

/* ATUALIZAR */
function atualizarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContador();
  renderizarCarrinho();
}

/* RENDER */
function renderizarCarrinho() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";

  let total = 0;

  carrinho.forEach((produto, index) => {

    const quantidade = produto.qtd || produto.quantidade || 1;

    total += produto.preco * quantidade;

    const item = document.createElement("div");
    item.className = "cart-item";

    item.innerHTML = `
      <img src="${produto.img}" class="cart-img">

      <div class="cart-info">
        <p class="cart-nome">${produto.nome}</p>
        <p class="cart-preco">
          R$ ${(produto.preco * quantidade).toFixed(2)}
        </p>
        <div class="cart-controls">
          <button class="diminuir">-</button>
          <span>${quantidade}</span>
          <button class="aumentar">+</button>
          <button class="remover">🗑</button>
        </div>
      </div>
    `;

    const diminuir = item.querySelector(".diminuir");
    const aumentar = item.querySelector(".aumentar");
    const remover = item.querySelector(".remover");

    diminuir.addEventListener("click", () => {
      if (quantidade > 1) {
        produto.qtd = quantidade - 1;
      } else {
        carrinho.splice(index, 1);
      }
      atualizarCarrinho();
    });

    aumentar.addEventListener("click", () => {
      produto.qtd = quantidade + 1;
      atualizarCarrinho();
    });

    remover.addEventListener("click", () => {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    });

    cartItems.appendChild(item);
  });

  cartTotal.textContent = total.toFixed(2);

  atualizarFrete(total);
  atualizarTotal();
}

/* FRETE */
function atualizarFrete(total) {
  const frete = document.getElementById("free-shipping");

  if (!frete) return;

  const faltante = 440 - total;

  if (total >= 440) {
    frete.innerHTML = "✔ Frete grátis liberado";
    frete.style.color = "#00ff88";
  } else {
    frete.innerHTML = `Faltam R$ ${faltante.toFixed(2)} para frete grátis`;
    frete.style.color = "#ff3b3b";
  }
}

/* FRETE + TOTAL */
const pacInput = document.querySelectorAll('input[name="shipping"]')[0];
const sedexInput = document.querySelectorAll('input[name="shipping"]')[1];

const pacPrice = document.getElementById("pac-price");
const sedexPrice = document.getElementById("sedex-price");

let sedexFrete = 0;

function gerarSedex(){
  sedexFrete = parseFloat((Math.random() * (36.39 - 34) + 34).toFixed(2));
}

function atualizarTotal(){

  let subtotal = parseFloat(document.getElementById("cart-total")?.innerText) || 0;

  let pacFrete = subtotal >= 440 ? 0 : 26.70;

  if (pacPrice) pacPrice.innerText = pacFrete === 0 ? "Grátis" : `R$ ${pacFrete.toFixed(2)}`;
  if (sedexPrice) sedexPrice.innerText = `R$ ${sedexFrete.toFixed(2)}`;

  let frete = pacInput?.checked ? pacFrete : sedexFrete;

  let total = subtotal + frete;

  document.getElementById("final-total").innerText = total.toFixed(2);

  let pix = total * 0.95;
  document.getElementById("pix-total").innerText = pix.toFixed(2);
}

document.querySelectorAll('input[name="shipping"]').forEach(input=>{
  input.addEventListener("change", atualizarTotal);
});

document.querySelectorAll(".produto").forEach(produto => {
  const img = produto.querySelector("img");
  const btn = produto.querySelector(".btn-comprar");

  if (img && btn) {
    const id = btn.dataset.id;

    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      window.location.href = `produto.html?id=${id}`;
    });
  }
});

