import { products } from "../productsData.js";
export function filteredProducts(containerSelector, renderProductsFn) {
    const container = document.querySelector(containerSelector);
    if(!container) return;

    const buttons = document.querySelectorAll(".filter-button");
    container.addEventListener("click", (e) => {
        const button = e.target;
        if(!button) return;
        
        const filterValue = button.dataset.filter;
        const filterType = button.closest('ul').classList[0]
        let filtered = products;
        if (filterValue !== "all") {
            filtered = products.filter(p => p[filterType] === filterValue);
        }
        renderProductsFn(".all-product-container", filtered);
        }); 
    
}