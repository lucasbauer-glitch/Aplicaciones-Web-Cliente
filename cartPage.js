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
      const itemTotal = item.quantity * parseFloat(item.priceCurrent.replace(/[^0-9.-]+/g, ""));
      total += itemTotal;

      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-item");
      productDiv.innerHTML = `
        <h3>${item.title}</h3>
        <p>Precio: ${item.priceCurrent}</p>
        <p>Cantidad: ${item.quantity}</p>
        <p>Subtotal: $${itemTotal.toLocaleString("es-AR")}</p>
        <button class="btn-remove" data-index="${index}">Eliminar</button>
      `;
      cartContainer.appendChild(productDiv);
    });

    cartSummary.innerHTML = `
      <h2>Total: $${total.toLocaleString("es-AR")}</h2>
      <button id="btn-clear">Vaciar carrito</button>
    `;

  }

  renderCart();
});
