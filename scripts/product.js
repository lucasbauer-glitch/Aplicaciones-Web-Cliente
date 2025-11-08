
import { formatPrice } from './core/utils.js';
import { obtenerUnProducto } from './core/metodos.js';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const response = await obtenerUnProducto(id);

export async function normalizacionUnProducto(response) {
  try {
    const producto = response.fields;
    return {
      airtableId: response.id,
      link: producto.link,
      title: producto.title,
      images: (producto.images || "")
        .split(",")
        .map(url => url.trim())
        .filter(url => url),
      priceCurrent: producto.priceCurrent,
      priceOld: producto.priceOld,
      discount: producto.discount,
      brand: producto.brand,
      category: producto.category,
      id: producto.clientID,
      stock: producto.stock,
    };
    
  } catch (error) {
    console.error("Error al normalizar los productos:", error);
    return [];
  }
}

const product = await normalizacionUnProducto(response);

export function initProductDetails(cartModule) {
  function renderProductDescription(product) {
    
    return `
      <section class="description-section">
        <div class="container-description">
          <div class="row-description">
            <div class="container-images">
              <div class="product-images">
                <div class="main-image">
                  <img id="description-section-product-image" 
                    src="${product.images[0]}" 
                    alt="${product.title}">
                </div>
                <div class="thumbnails">
                  ${product.images
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
                <form id="product-form" data-id="${product.airtableId}" method="post" action="/comprar/">
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
    document.getElementById("product-container").innerHTML = renderProductDescription(product);

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