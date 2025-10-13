import { products } from "../productsData.js";

export function formatPrice(value) {
  return `$${value.toLocaleString("es-AR")}`;
}

export function getUniqueValues(key) {
  return [...new Set(products.map((product) => product[key]))];
}