import { initNavBar } from './components/navbar.js';
import { initHeader } from './components/head.js';
import { searchproducts } from './search.js';

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initNavBar();
  searchproducts();
  const page = document.body.dataset.page;
    
  switch (page) {
    case 'index':
      import('./pages/index.js').then(m => m.initIndex());
      break;
    case 'allProduct':
      import('./pages/allProduct.js').then(m => m.initAllProduct());
      break;
  }
});