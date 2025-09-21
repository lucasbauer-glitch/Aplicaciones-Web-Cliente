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
          <span class="price-current">${formatPrice(priceCurrent)}</span>
          <span class="price-old">${formatPrice(priceOld)}</span>
          <span class="discount">${discount}</span>
        </div>
        <div class="product-action">
          <form class="product-form" data-id="${id}" method="post">
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
  const forms = document.querySelectorAll(".product-form");
  forms.forEach(addToCartHandler);
});


// slider
let current = 1;
const totalSlides = 3;
let timer;

function autoSlide() {
  document.getElementById("slide" + current).checked = true;
  current++;
  if (current > totalSlides) {
    current = 1;
  }
  timer = setTimeout(autoSlide, 4000);
}

autoSlide();

document.querySelectorAll(".navigation label").forEach((label, index) => {
  label.addEventListener("click", () => {
    clearTimeout(timer);
    current = index + 1;
    autoSlide();
  });
});