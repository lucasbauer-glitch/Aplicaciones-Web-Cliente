export function initNavBar() {
  const navBar = document.getElementById('navbar');
  if (!navBar) return;


  navBar.innerHTML = `
    <nav class="head-nav">
      <a href="index.html">Inicio</a>
      <a href="allProduct.html">Productos</a>
      <a href="contactPage.html">Contacto</a>
    </nav>
  `;

  // ocultar el nav bar en mobile
  const btnMenu = document.querySelector(".btn-menu");
  const nav = navBar.querySelector(".head-nav");

  if (btnMenu && nav) {
    btnMenu.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("active");
    });
  }
}
