import { obtenerProductos } from "./metodos.js";
import { normalizacion } from "./utils.js";

let cachedProducts = null;

export async function getProducts() {
  if (cachedProducts) return cachedProducts;

  try {
    const response = await obtenerProductos();
    cachedProducts = await normalizacion(response);
    return cachedProducts;
  } catch (err) {
    console.error("Error cargando productos:", err);
    throw err;
  }
}
