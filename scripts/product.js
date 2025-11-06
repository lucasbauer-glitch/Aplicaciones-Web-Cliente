
import { formatPrice } from './core/utils.js';
import { initCart } from './cart.js';
import { obtenerUnProducto } from './core/metodos.js';
const cartModule = await initCart();

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const product = await obtenerUnProducto(id);


export function initProductDetails() {
  function renderProductDescription(product) {

    const images = Array.isArray(product.images)
    if (typeof product.images === "string") {
    return product.images
      .split(",")
      .map(img => img.trim())
      .filter(img => img.length > 0);
    }

    return `
      <section class="description-section">
        <div class="container-description">
          <div class="row-description">
            <div class="container-images">
              <div class="product-images">
                <div class="main-image">
                  <img id="description-section-product-image" 
                    src="${images[0]}" 
                    alt="${product.title}">
                </div>
                <div class="thumbnails">
                  ${images
                    .map(
                      (img, index) =>
                        `<img src="${img}" alt="Miniatura ${index + 1}" class="thumbnail">`
                    )
                    .join("")}
                </div>
              </div>
            </div>
            <div class="col" id="product-info">
              <nav class="breadcrumbs">
                Inicio &gt; Productos &gt; ${product.title}
              </nav>
              <h1 id="product-title">${product.title}</h1>
              <div class="price-container">
                <span class="price-old">${formatPrice(product.priceOld)}</span>
                <span class="discount">${product.discount}</span>
                <span class="price-current-description">${formatPrice(product.priceCurrent)}</span>
              </div>
              <div class="container-form">
                <form id="product-form" data-id="${product.id}" method="post" action="/comprar/">
                  <div class="quantity">
                    <button type="button" class="quantity-decrease">-</button>
                    <input type="number" name="quantity" value="1" min="1">
                    <button type="button" class="quantity-increase">+</button>
                  </div>
                  <input type="submit" value="Agregame" class="btn-add-to-cart">
                </form>
              </div>    
            </div>
          </div>    
        </div>
      </section>
    `;
  }

  
  if (product) {
    document.getElementById("product-container").innerHTML = renderProductDescription(product.fields);

    const mainImage = document.getElementById("description-section-product-image");
    const thumbs = document.querySelectorAll(".thumbnail");

    thumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
      });
    });
  } else {
    document.getElementById("product-container").innerHTML = "<p>Producto no encontrado</p>";
  }
  


  const quantity = document.querySelector(".quantity");
  const btnDecrease = quantity.querySelector(".quantity-decrease");
  const inputQuantity= quantity.querySelector("input[name=quantity]");
  const btnIncrease = quantity.querySelector(".quantity-increase");

  btnDecrease.addEventListener("click", () => {
    if(parseInt(inputQuantity.value) > parseInt(inputQuantity.min))
    inputQuantity.value = parseInt(inputQuantity.value) - 1;
  })

  btnIncrease.addEventListener("click", () => {
    inputQuantity.value = parseInt(inputQuantity.value) + 1
  })
  const form = document.getElementById("product-form");
  cartModule.addToCartHandler(form);

}