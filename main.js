// ocultar el nav bar en mobile
document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".btn-menu");
  const nav = document.querySelector(".head-nav");

  btnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.toggle("active");
  });
});

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
          <span class="price-current">${priceCurrent}</span>
          <span class="price-old">${priceOld}</span>
          <span class="discount">${discount}</span>
        </div>
        <div class="product-action">
          <form method="post" action="/comprar/">
            <input type="hidden" name="add_to_cart" value="${id}">
            <button type="submit" class="btn-buy">Comprar</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".products-slid");
  container.innerHTML = products.map(Product).join("");

  const btnLeft = document.querySelector(".btn-left");
  const btnRight = document.querySelector(".btn-right");

  btnLeft.addEventListener("click", () => {
    container.scrollBy({ left: -300, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    container.scrollBy({ left: 300, behavior: "smooth" });
  });
});
