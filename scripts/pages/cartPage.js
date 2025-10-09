import { formatPrice } from "../core/utils.js";
import { initCart } from "../cart.js";
const cartModule = initCart();

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
        <img src="${item.image}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <button class="btn-remove" data-index="${index}">Eliminar</button>
        </div>
        <div class="cart-item-quantity ">
          <button type="button" class="quantity-decrease">-</button>
          <input type="number" name="quantity" value=${item.quantity} min="1">
          <button type="button" class="quantity-increase">+</button>
        </div>
        <div class ="cart-item-price">
          <p>${formatPrice(item.quantity * item.priceCurrent)}</p>
        </div>
        
        
      `;
      cartContainer.appendChild(productDiv);
    });

    cartSummary.innerHTML = `
      <h2>Total: $${total.toLocaleString("es-AR")}</h2>
      <button id="btn-buy">Finalizar compra</button>
    `;

    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart))
          renderCart();
          cartModule.updateCartBadge();
        });
      });
  }
  renderCart();
