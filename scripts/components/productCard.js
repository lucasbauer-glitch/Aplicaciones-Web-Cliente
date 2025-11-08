import { formatPrice } from '../core/utils.js';

export function createProductElement({ title, images, priceCurrent, priceOld, discount, airtableId }) {
    const product = document.createElement("div");
    product.classList.add("product");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("product-image");

    const linkImg = document.createElement("a");
    linkImg.setAttribute("href", `description.html?id=${airtableId}`);
    linkImg.setAttribute("title", title);

    const img = document.createElement("img");
    img.setAttribute("src", images[0]);
    img.setAttribute("alt", title);
    img.setAttribute("width", "400");
    img.setAttribute("height", "591");

    linkImg.appendChild(img);
    imageDiv.appendChild(linkImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("product-info");

    const linkTitle = document.createElement("a");
    linkTitle.setAttribute("href", `description.html?id=${airtableId}`);

    const h3 = document.createElement("h3");
    h3.classList.add("product-name");
    h3.textContent = title;

    linkTitle.appendChild(h3);

    const pricesDiv = document.createElement("div");
    pricesDiv.classList.add("product-prices");

    const priceCurrentEl = document.createElement("span");
    priceCurrentEl.classList.add("price-current");
    priceCurrentEl.textContent = formatPrice(priceCurrent);

    const priceOldEl = document.createElement("span");
    priceOldEl.classList.add("price-old");
    priceOldEl.textContent = formatPrice(priceOld);

    const discountEl = document.createElement("span");
    discountEl.classList.add("discount");
    discountEl.textContent = discount;

    pricesDiv.append(priceCurrentEl, priceOldEl, discountEl);

    const actionDiv = document.createElement("div");
    actionDiv.classList.add("product-action");

    const form = document.createElement("form");
    form.classList.add("product-form");
    form.setAttribute("data-id", airtableId);
    form.setAttribute("method", "post");

    const input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "add_to_cart");
    input.setAttribute("value", airtableId);

    const button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.setAttribute("class", "btn-buy");
    button.textContent = "Agregar al Carrito";

    form.append(input, button);
    actionDiv.appendChild(form);

    infoDiv.append(linkTitle, pricesDiv, actionDiv);
    product.append(imageDiv, infoDiv);

    return product;
}
