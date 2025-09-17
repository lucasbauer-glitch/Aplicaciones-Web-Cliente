let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (!badge) return;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalQuantity;
}

function addToCartHandler(form) {
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = form.dataset.id;
    const quantityInput = form.querySelector('input[name="quantity"]');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        quantity: quantity,
        priceCurrent: product.priceCurrent
      });
    }

    updateCartBadge();
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
document.addEventListener("DOMContentLoaded", updateCartBadge);