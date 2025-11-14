import { getProducts } from '../core/productStore.js';

export async function filteredProducts(containerSelector, renderProductsFn) {
    const container = document.querySelector(containerSelector);
    if(!container) return;

    container.addEventListener("click", async (e) => {
        const button = e.target.closest(".filter-button");
        if(button) {
            const list = button.closest("ul");
            if (!list) return; 
            const filterType = list.dataset.filterType;
            const filterValue = button.dataset.filter;

            let filtered = await getProducts();
            if (filterValue !== "all") {
                filtered = filtered.filter(p => p[filterType] === filterValue);
            }
            renderProductsFn(filtered);
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