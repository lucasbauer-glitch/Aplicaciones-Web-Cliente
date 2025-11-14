import { initNavBar } from './components/navbar.js';
import { initHeader } from './components/head.js';
import { searchproducts } from './search.js';
import { initCart } from './cart.js';
import { initFooter } from './components/footer.js';



document.addEventListener("DOMContentLoaded", async () => {
  
  let cartModule;
  const page = document.body.dataset.page;
  if (page !== 'login' && page !== 'crudProduct') {
    cartModule = await initCart();
    initHeader();
    initNavBar();
    searchproducts();
    initFooter();
    cartModule.updateCartBadge();
  }
  switch (page) {
    case 'index':
      import('./pages/index.js').then(m => m.initIndex(cartModule));
      break;
    case 'allProduct':
      import('./pages/allProduct.js').then(m => m.initAllProduct(cartModule));
      break;
    case 'description':
      import('./product.js').then(m => m.initProductDetails(cartModule));
      break; 
    case 'login':
      import('./pages/login.js').then(m => m.initLogin());
      break;
    case 'crudProduct':
      import('./pages/crudProduct.js').then(m => m.initCrudProduct());
      break;
    case 'cart':
      import('./pages/cartPage.js').then(m => m.initCartPage(cartModule));
      break;
    case 'contact':
      import('./pages/contactPage.js').then(m => m.initContactPage(cartModule));
      break;
  }
});