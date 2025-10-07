import { initNavBar } from './components/navbar.js';
import { initHeader } from './components/head.js';
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initNavBar();
  const page = document.body.dataset.page;
    
  switch (page) {
    case 'index':
      import('./pages/index.js').then(m => m.initIndex());
      break;
    case 'about':
      import('./pages/about.js').then(m => m.initAbout());
      break;
    case 'contact':
      import('./pages/contact.js').then(m => m.initContact());
      break;
  }
});