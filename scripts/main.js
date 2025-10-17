import { initNavBar } from './components/navbar.js';
import { initHeader } from './components/head.js';
import { searchproducts } from './search.js';
import { initCart } from './cart.js';
import { initFooter } from './components/footer.js';
import { obtenerProductos } from './config.js';
const cartModule = initCart();
initHeader();
initNavBar();
searchproducts();
initFooter();
cartModule.updateCartBadge();

/*//chusmeo la api
obtenerProductos();
*/
document.addEventListener("DOMContentLoaded", () => {
  
  const page = document.body.dataset.page;
    
  switch (page) {
    case 'index':
      import('./pages/index.js').then(m => m.initIndex());
      break;
    case 'allProduct':
      import('./pages/allProduct.js').then(m => m.initAllProduct());
      break;
    case 'description':
      import('./product.js').then(m => m.initProductDetails());
      break;  
  }
});