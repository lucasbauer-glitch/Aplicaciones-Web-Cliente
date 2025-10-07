import { formatPrice } from '../core/utils.js';
import { slider } from '../components/slider.js';
import { products } from '../productsData.js';
import { initCart } from '../cart.js';
const cartModule = initCart();
export function initIndex() {
  slider();
  
  // función que genera el HTML de cada producto
  function Product({ title, images, priceCurrent, priceOld, discount, id }) {
    return `
      <div class="product">
        <div class="product-image">
          <a href="description.html?id=${id}" title="${title}">
            <img src="${images[0]}" alt="${title}" width="400" height="591">
          </a>
        </div>
        <div class="product-info">
          <a href="description.html?id=${id}">
            <h3 class="product-name">${title}</h3>
          </a>
          <div class="product-prices">
            <span class="price-current">${formatPrice(priceCurrent)}</span>
            <span class="price-old">${formatPrice(priceOld)}</span>
            <span class="discount">${discount}</span>
          </div>
          <div class="product-action">
            <form class="product-form" data-id="${id}" method="post">
              <input type="hidden" name="add_to_cart" value="${id}">
              <button type="submit" class="btn-buy">Agregar al Carrito</button>
            </form>
          </div>
        </div>
      </div>  
    `;
  }
  //refactorizado para grilla de productos
  function renderProducts(containerSelector, withScrollButtons = false, productList = products) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    container.innerHTML = productList.map(Product).join("");
    if (withScrollButtons) {
      const btnLeft = document.querySelector(".btn-left");
      const btnRight = document.querySelector(".btn-right");
      if (btnLeft && btnRight) {
        btnLeft.addEventListener("click", () => {
          container.scrollBy({ left: -300, behavior: "smooth" });
        });

        btnRight.addEventListener("click", () => {
          container.scrollBy({ left: 300, behavior: "smooth" });
        });
      }
    }
    const forms = document.querySelectorAll(".product-form");
    forms.forEach(cartModule.addToCartHandler);
  }
  
    renderProducts(".products-slid", true);

};