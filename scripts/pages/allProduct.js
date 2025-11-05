import { initCart } from '../cart.js';
import { renderFilterOptions } from '../components/filterList.js';
import { createProductElement } from '../components/productCard.js';
import { getUniqueValues } from "../core/utils.js";
import { filteredProducts } from '../components/setupFilters.js';
import { obtenerProductos } from '../core/metodos.js';
import { normalizacion } from './crudProduct.js';

<<<<<<< HEAD


export async function initAllProduct() {

  const productsData = await obtenerProductos();
  const products = normalizacion(productsData.records);
  const cartModule = initCart();

  function renderProducts(productList = products) {
    const container = document.querySelector(".all-product-container");
=======

const cartModule = initCart();

export async function initAllProduct() {
  const allContainer = ".all-product-container";
  const productsData = await obtenerProductos();
  const products = normalizacion(productsData.records);
  function renderProducts(containerSelector, productList = products) {
    const container = document.querySelector(containerSelector);
>>>>>>> 1d14b0c0cfcd9d996360b9e31cb4b2451a6d5728
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
  const forms = document.querySelectorAll(".product-form");
  forms.forEach(cartModule.addToCartHandler);
  const categories = getUniqueValues("category");
  const brands = getUniqueValues("brand");
  renderFilterOptions(filtersContainer, "category", "Categoría", categories); 
  renderFilterOptions(filtersContainer, "brand", "Marca", brands);
  filteredProducts(".filters", renderProducts);
}

