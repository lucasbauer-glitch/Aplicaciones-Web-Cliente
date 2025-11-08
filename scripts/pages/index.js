import { slider } from '../components/slider.js';
import { createProductElement } from '../components/productCard.js';
import { getProducts } from '../core/productStore.js';




export async function initIndex(cartModule) {
  
    const container = document.querySelector(".products-slid");
    if (!container) return;

    container.innerHTML = "<p class='loading-text'>Cargando productos...</p>";

    try {
      const products = await getProducts();


      container.innerHTML = "";
      
      products.forEach((prod) => {
        const el = createProductElement(prod);
        container.appendChild(el);
      });

      slider();

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
      forms.forEach(form => cartModule.addToCartHandler(form));
    } catch (err) {
      console.error("Error cargando productos:", err);
      container.innerHTML = "<p class='error-text'>No se pudieron cargar los productos.</p>";
  }
}

