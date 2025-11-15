import { renderFilterOptions } from '../components/filterList.js';
import { createProductElement } from '../components/productCard.js';
import { getUniqueValues } from "../core/utils.js";
import { filteredProducts } from '../components/setupFilters.js';
import { getProducts } from '../core/productStore.js';




export async function initAllProduct(cartModule) {

  const products = await getProducts();
  

  function renderProducts(productList = products) {
    const container = document.querySelector(".all-product-container");
    if (!container) return;

    container.textContent = "";

    productList.forEach((prod) => {
      const el = createProductElement(prod);
      container.appendChild(el);
    });

    const forms = document.querySelectorAll(".product-form");
    forms.forEach(cartModule.addToCartHandler);
  }
  
  renderProducts();

  //filtros para allProducts.html
  const modal = document.getElementById("filterModal");
  const openBtn = document.getElementById("openFilterModal");
  const closeBtn = modal.querySelector(".close");
  const filtersContainer = modal.querySelector(".filters");

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }  
  });
  const categories = getUniqueValues("category", products);
  const brands = getUniqueValues("brand", products);
  renderFilterOptions(filtersContainer, "category", "Categoría", categories); 
  renderFilterOptions(filtersContainer, "brand", "Marca", brands);
  filteredProducts(".filters", renderProducts, products);
}
