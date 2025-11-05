import { slider } from '../components/slider.js';
import {obtenerProductos} from '../core/metodos.js';
import { initCart } from '../cart.js';
import { createProductElement } from '../components/productCard.js';

const cartModule = initCart();

function normalizacion(productosResponse) {
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

export async function initIndex() {
  
    const container = document.querySelector(".products-slid");
    if (!container) return;

    container.innerHTML = "<p class='loading-text'>Cargando productos...</p>";

    try {
      const productsData = await obtenerProductos();
      const products = normalizacion(productsData);

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
      forms.forEach(cartModule.addToCartHandler);
    } catch (err) {
      console.error("Error cargando productos:", err);
      container.innerHTML = "<p class='error-text'>No se pudieron cargar los productos.</p>";
  }
}

