export function initHeader() {
  const header = document.getElementById('head');
  if (!header) return;

  header.innerHTML = `
    <div class="head-logo-row">
      <div class="container-head">
        <div class="row">

          <div class="menu-mobile">
            <a href="index.html" class="btn-menu" aria-label="Menú">
              <svg><use xlink:href="#bars"></use></svg>
            </a>
          </div>

          <div class="search-col">
            <form class="search-form" action="/search/" method="get">
              <input type="search" name="q" placeholder="Buscar" aria-label="Buscar" class="search-input">
              <button type="submit" class="search-btn" aria-label="Buscar">
                <svg class="icon"><use href="#search"></use></svg>
              </button>
            </form>
            <ul class="resultados"></ul>
          </div>

          <div class="logo-col">
            <a href="index.html" class="logo" title="Pokemania">
              <img src="https://i.ibb.co/PGPwTKPz/pokelogob.png" alt="Pokemania" class="logo-img">
            </a>
          </div>

          <div class="actions-col">
            <a href="/account/login/" class="btn-user" aria-label="Cuenta">
              <svg><use xlink:href="#user"></use></svg>
            </a>
          </div>
          <div class="cart-col">  
            <a href="cart.html" class="btn-cart" aria-label="Carrito">
              <svg><use xlink:href="#cart"></use></svg>
              <span class="cart-badge">0</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

initHeader();
