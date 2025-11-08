import { formatPrice } from "../core/utils.js";

export function initCartPage(cartModule) {
const { showCartAlert } = cartModule;
const cartContainer = document.getElementById("cart-container");
const cartSummary = document.getElementById("cart-summary");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function getProductStock(id) {
  const products = cartModule.products;
  const product = products.find(p => p.airtableId === id);
  return product ? product.stock : null;
}

async function renderCart() {
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    cartSummary.innerHTML = "";
    return;
  }

  let total = 0;

  for (const [index, item] of cart.entries()) {
    const itemTotal = item.quantity * parseFloat(item.priceCurrent);
    total += itemTotal;

    const productStock = await getProductStock(item.id);

    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-item");
    productDiv.innerHTML = `
      <img src="${item.image}">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <button class="btn-remove" data-index="${index}">Eliminar</button>
      </div>
      <div class="cart-item-quantity">
        <button type="button" class="quantity-decrease">-</button>
        <input type="number" name="quantity" value="${item.quantity}" min="1" max="${productStock}">
        <button type="button" class="quantity-increase">+</button>
      </div>
      <div class="cart-item-price">
        <p>${formatPrice(itemTotal)}</p>
      </div>
    `;

    cartContainer.appendChild(productDiv);

    const inputQuantity = productDiv.querySelector("input[name=quantity]");
    const btnDecrease = productDiv.querySelector(".quantity-decrease");
    const btnIncrease = productDiv.querySelector(".quantity-increase");

    btnDecrease.addEventListener("click", () => {
      const newValue = Math.max(1, parseInt(inputQuantity.value) - 1);
      inputQuantity.value = newValue;
      item.quantity = newValue;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    btnIncrease.addEventListener("click", () => {
      const newValue = parseInt(inputQuantity.value) + 1;
      if (newValue > productStock) {
        showCartAlert(`Solo hay ${productStock} unidades disponibles de "${item.title}".`);
        return;
      }
      inputQuantity.value = newValue;
      item.quantity = newValue;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    inputQuantity.addEventListener("change", () => {
      let newValue = parseInt(inputQuantity.value);
      if (isNaN(newValue) || newValue < 1) newValue = 1;
      if (newValue > productStock) {
        showCartAlert(`Stock máximo: ${productStock} unidades.`);
        newValue = productStock;
      }
      inputQuantity.value = newValue;
      item.quantity = newValue;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  }

  cartSummary.innerHTML = `
    <h2>Total: $${total.toLocaleString("es-AR")}</h2>
    <button id="btn-buy">Finalizar compra</button>
  `;

  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      cartModule.updateCartBadge();
    });
  });
}

renderCart();
}