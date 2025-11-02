import { slider } from '../components/slider.js';
import {obtenerProductos} from '../core/metodos.js';
/*import { products } from '../productsData.js';*/
import { initCart } from '../cart.js';
import { createProductElement } from '../components/productCard.js';
import {normalizacion} from './crudProduct.js';
const cartModule = initCart();
const productsData = await obtenerProductos();
const products = normalizacion(productsData);
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