import { formatPrice } from '../core/utils.js';
import { products } from '../productsData.js';


export function initAllProduct() {

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
    forms.forEach(addToCartHandler);
  }
  
    renderProducts(".all-product-container", false);

  //filtros para allProducts.html

  function getUniqueValues(key) {
    return [...new Set(products.map((product) => product[key]))];
  }

  function renderFilterOptions() {
    const filterContainer = document.querySelector(".filters");
    if (!filterContainer) return;
    const marcas = getUniqueValues("brand");
    const categorias = getUniqueValues("category");

    const categoriaHTML = `
      <h4>Categoría</h4>
        <ul class="category">
          <li class="filter-item"><button class="filter-button" data-filter="all">Todos</button></li>
          ${categorias.map(m =>`<li class="filter-item"><button class="filter-button" data-filter="${m}">${m}</button></li>`).join('')}
        </ul>  
      `;
    const marcasHTML = `
      <h4>Marca</h4>
        <ul class="brand">
          <li class="filter-item"><button class="filter-button" data-filter="all">Todos</button></li>
          ${marcas.map(m =>`<li class="filter-item"><button class="filter-button" data-filter="${m}">${m}</button></li>`).join('')}
        </ul>  
      `;
    filterContainer.innerHTML = categoriaHTML + marcasHTML;
  }

  renderFilterOptions();

  function filteredProducts() {
    const buttons = document.querySelectorAll(".filter-button");
    const allContainer = ".all-product-container";

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filterValue = button.dataset.filter;
        const filterClass = button.closest('ul').classList[0];
        let filtered = products;

        if (filterValue !== "all") {
            filtered = products.filter(product => {
              if(filterClass === "category") return product.category === filterValue;
              if (filterClass === "brand" ) return product.brand === filterValue;
          });
        }
        renderProducts(allContainer, false, filtered);
      }); 
    })
  }
  filteredProducts();


};