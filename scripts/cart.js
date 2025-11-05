//import { products } from "./productsData.js";
import { obtenerProductos } from "./core/metodos.js";
const productosResponse = await obtenerProductos();
function normalizacion() {
  return productosResponse.records.map(producto => ({
    airtableId: producto.id,
    link: producto.fields.link,
    title: producto.fields.title,
    images: (producto.fields.images || "")
      .split(",")
      .map(url => url.trim())
      .filter(url => url),
    priceCurrent: producto.fields.priceCurrent,
    priceOld: producto.fields.priceOld,
    discount: producto.fields.discount,
    brand: producto.fields.brand,
    category: producto.fields.category,
    id: producto.fields.clientID,
    stock: producto.fields.stock,
  }));
}
const products = normalizacion();

export function initCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


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

      const product = products.find(p => p.id === id);
      if (!product) return;

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          quantity: quantity,
          priceCurrent: product.priceCurrent,
          image: product.images[0]
        });
      }

      
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      showCartAlert()
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
  return {addToCartHandler, updateCartBadge, showCartAlert, cart };
}