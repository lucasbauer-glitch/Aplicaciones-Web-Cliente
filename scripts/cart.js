import { getProducts } from "./core/productStore.js";

export async function initCart() {
  //console.log("initCart ejecutado");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const products = await getProducts();


  function updateCartBadge() {
    const badge = document.querySelector(".cart-badge");
    if (!badge) return;

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = currentCart.reduce((sum, item) => sum + item.quantity, 0);

    badge.textContent = totalQuantity;
  }

  function addToCartHandler(form) {
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const id = form.dataset.id;
      const quantityInput = form.querySelector('input[name="quantity"]');
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

      const product = products.find(p => p.airtableId === id);
      if (!product) return;

      const stockDisponible = product.stock || 0;
      const existing = cart.find(item => item.id === id);
      const cantidadActual = existing ? existing.quantity : 0;
      const nuevaCantidad = cantidadActual + quantity;

      if (nuevaCantidad > stockDisponible) {
        showCartAlert(`Solo hay ${stockDisponible} unidades disponibles de "${product.title}".`);
        return;
      }

      if (existing) {
        existing.quantity = nuevaCantidad;
      } else {
        cart.push({
          id: product.airtableId,
          title: product.title,
          quantity: quantity,
          priceCurrent: product.priceCurrent,
          image: product.images[0],
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      showCartAlert();
    });
  }


  document.addEventListener("DOMContentLoaded", updateCartBadge);

  function showCartAlert(message="Producto agregado al carrito"){
    const alertBox = document.getElementById("cart-alert");
    if(!alertBox) return;

    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(()=>{
      alertBox.classList.remove("show");
    }, 2000);
  }
  return {addToCartHandler, updateCartBadge, showCartAlert, cart, products};
}