document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const cartSummary = document.getElementById("cart-summary");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
      cartSummary.innerHTML = "";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.quantity * parseFloat(item.priceCurrent);
      total += itemTotal;

      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");
      productDiv.innerHTML = `
        <h3>${item.title}</h3>
        <p>Precio: ${formatPrice(item.priceCurrent)}</p>
        <p>Cantidad: ${item.quantity}</p>
        <p>Subtotal: ${formatPrice(item.quantity * item.priceCurrent)}</p>
        <button class="btn-remove" data-index="${index}">Eliminar</button>
      `;
      cartContainer.appendChild(productDiv);
    });

    cartSummary.innerHTML = `
      <h2>Total: $${total.toLocaleString("es-AR")}</h2>
      <button id="btn-clear">Vaciar carrito</button>
    `;

    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart))
          renderCart();
          updateCartBadge();
        });
      });
    const btnClear = document.getElementById("btn-clear")
    if(btnClear){
      btnClear.addEventListener("click", () =>{
        cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
        renderCart();
        updateCartBadge();
      })
    }
  }
  renderCart();
});
