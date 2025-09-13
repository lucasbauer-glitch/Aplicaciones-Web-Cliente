//ocultar el nav bar en mobile
document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".btn-menu");
  const nav = document.querySelector("nav");

  btnMenu.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.toggle("active");
  });
});

//productos
const products = [
  {
    link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
    title: "Pokémon Booster Pack S&V Surging Sparks Inglés (Arte Aleatorio)",
    img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/327px-sv8_booster_pikachu-2c0ce094f7dff2d2ba17398482200736-1024-1024.webp",
    priceCurrent: "$7.650,00",
    priceOld: "$8.500,00",
    discount: "-10% OFF",
    productId: "199652512"
  },
  {
    link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
    title: "Pokémon Booster Pack S&V Obsidian Flames Inglés (Arte Aleatorio)",
    img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetobsid-dd8fdb7a4964322d0a17451143424423-1024-1024.png",
    priceCurrent: "$7.650,00",
    priceOld: "$8.500,00",
    discount: "-10% OFF",
    productId: "199652512"
  },
  {
  link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
  title: "Pokémon Booster Pack S&V Obsidian Flames Inglés (Arte Aleatorio)",
  img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetobsid-2-11e0a9ba4c6917720617451143453318-1024-1024.png",
  priceCurrent: "$7.650,00",
  priceOld: "$8.500,00",
  discount: "-10% OFF",
  productId: "199652512"
  },
  {
    link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
    title: "Pokémon Booster Pack Sleeved S&V Stellar Crown Inglés (Arte Aleatorio)",
    img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetparad-e4f5254e03feca6b0217398502377050-1024-1024.webp",
    priceCurrent: "$7.650,00",
    priceOld: "$8.500,00",
    discount: "-10% OFF",
    productId: "199652512"
  },
  {
    link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
    title: "Pokémon Booster Pack S&V Obsidian Flames Inglés (Arte Aleatorio)",
    img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetobsid-dd8fdb7a4964322d0a17451143424423-1024-1024.png",
    priceCurrent: "$7.650,00",
    priceOld: "$8.500,00",
    discount: "-10% OFF",
    productId: "199652512"
  },
  {
  link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
  title: "Pokémon Booster Pack S&V Obsidian Flames Inglés (Arte Aleatorio)",
  img: "https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetobsid-2-11e0a9ba4c6917720617451143453318-1024-1024.png",
  priceCurrent: "$7.650,00",
  priceOld: "$8.500,00",
  discount: "-10% OFF",
  productId: "199652512"
  }
];

function Product({ link, title, img, priceCurrent, priceOld, discount, productId }) {
  return `
    <div class="product">
      <div class="product-image">
        <a href="${link}" title="${title}">
          <img src="${img}" alt="${title}" width="400" height="591">
        </a>
      </div>
      <div class="product-info">
        <a href="${link}">
          <h3 class="product-name">${title}</h3>
        </a>
        <div class="product-prices">
          <span class="price-current">${priceCurrent}</span>
          <span class="price-old">${priceOld}</span>
          <span class="discount">${discount}</span>
        </div>
        <div class="product-action">
          <form method="post" action="/comprar/">
            <input type="hidden" name="add_to_cart" value="${productId}">
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


