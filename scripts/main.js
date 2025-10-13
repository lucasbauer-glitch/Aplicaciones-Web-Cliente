import { initNavBar } from './components/Navbar.js';
import { initHeader } from './components/Head.js';
import { searchproducts } from './search.js';
import { initCart } from './cart.js';
import { initFooter } from './components/Footer.js';

const cartModule = initCart();
initHeader();
initNavBar();
searchproducts();
cartModule.updateCartBadge();
initFooter();
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