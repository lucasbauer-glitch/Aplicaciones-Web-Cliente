import { slider } from '../components/Slider.js';
import { products } from '../productsData.js';
import { initCart } from '../cart.js';
import { createProductElement } from '../components/ProductCard.js';
const cartModule = initCart();
export function initIndex() {
  slider();

  //refactorizado para grilla de productos
  function renderProducts(containerSelector, productList = products) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    productList.forEach((prod) => {
      const el = createProductElement(prod);
      container.appendChild(el);
    });
    
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
    
    const forms = document.querySelectorAll(".product-form");
    forms.forEach(cartModule.addToCartHandler);
  }
  
    renderProducts(".products-slid");

};