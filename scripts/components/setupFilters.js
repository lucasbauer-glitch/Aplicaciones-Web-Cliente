import { products } from "../productsData.js";
export function filteredProducts(containerSelector, renderProductsFn) {
    const container = document.querySelector(containerSelector);
    if(!container) return;

    container.addEventListener("click", (e) => {
        const button = e.target.closest(".filter-button");
        if(button) {
            const list = button.closest("ul");
            if (!list) return; 
            const filterType = list.dataset.filterType;
            const filterValue = button.dataset.filter;

            let filtered = products;
            if (filterValue !== "all") {
                filtered = products.filter(p => p[filterType] === filterValue);
            }
            renderProductsFn(".all-product-container", filtered);
            return;
        };
    
        const header = e.target.closest(".filter-header");
        if (header) {
            const section = header.closest(".filter-section");
            if (!section) return;
            section.classList.toggle("open");
            return;
        }
    });
}