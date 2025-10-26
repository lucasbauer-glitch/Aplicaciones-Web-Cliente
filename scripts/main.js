import { initNavBar } from './components/navbar.js';
import { initHeader } from './components/head.js';
import { searchproducts } from './search.js';
import { initCart } from './cart.js';
import { initFooter } from './components/footer.js';



document.addEventListener("DOMContentLoaded", () => {
  
  const page = document.body.dataset.page;
  if (page !== 'login' && page !== 'crudProduct') {
    const cartModule = initCart();
    initHeader();
    initNavBar();
    searchproducts();
    initFooter();
    cartModule.updateCartBadge();
  }
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
    case 'login':
      import('./pages/login.js').then(m => m.initLogin());
      break;
    case 'crudProduct':
      import('./pages/crudProduct.js').then(m => m.initCrudProduct());
      break;
  }
});