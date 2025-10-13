import { products } from '../productsData.js';
import { initCart } from '../cart.js';
import { renderFilterOptions } from '../components/FilterList.js';
import { createProductElement } from '../components/ProductCard.js';
import { getUniqueValues } from "../core/utils.js";
import { filteredProducts } from '../components/SetupFilters.js';
const cartModule = initCart();

export function initAllProduct() {
  const allContainer = ".all-product-container";

  function renderProducts(containerSelector, productList = products) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.textContent = "";

    productList.forEach((prod) => {
      const el = createProductElement(prod);
      container.appendChild(el);
    });

    const forms = document.querySelectorAll(".product-form");
    forms.forEach(cartModule.addToCartHandler);
  }
  
  renderProducts(allContainer);

  //filtros para allProducts.html

  const categories = getUniqueValues("category");
  const brands = getUniqueValues("brand");
  const filtersContainer = document.querySelector(".filters");
  renderFilterOptions(filtersContainer, "category", "Categoría", categories); 
  renderFilterOptions(filtersContainer, "brand", "Marca", brands);
  filteredProducts(".filters", renderProducts);
};


