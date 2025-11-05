import { products } from "../productsData.js";

export function formatPrice(value) {
  return `$${value.toLocaleString("es-AR")}`;
}

export function getUniqueValues(key) {
  return [...new Set(products.map((product) => product[key]))];
}

export async function normalizacion(response) {
  try {
    return response.records.map(producto => ({
      airtableId: producto.id,
      link: producto.fields.link,
      title: producto.fields.title,
      images: (producto.fields.images || "")
        .split(",")
        .map(url => url.trim())
        .filter(url => url),
      priceCurrent: producto.fields.priceCurrent,
      priceOld: producto.fields.priceOld,
      discount: producto.fields.discount,
      brand: producto.fields.brand,
      category: producto.fields.category,
      id: producto.fields.clientID,
      stock: producto.fields.stock,
    }));
    
  } catch (error) {
    console.error("Error al normalizar los productos:", error);
    return [];
  }
}