import{obtenerProductos} from '../env.js';
import {crearProducto} from '../env.js';
import { editarProducto } from '../env.js';
import { borrarProducto } from '../env.js';
const productos = await obtenerProductos();

export function normalizacion(){
    return productos.records.map(producto => ({
        airtableId: producto.id,
        link: producto.fields.link,
        title: producto.fields.title,
        images: producto.fields.images,
        priceCurrent: producto.fields.priceCurrent,
        priceOld: producto.fields.priceOld,
        discount: producto.fields.discount,
        brand: producto.fields.brand,
        category: producto.fields.category,
        id: producto.fields.clientID,
    }))};

const listadoProductos = normalizacion();
/*console.log('listadoProductos:', normalizacion());*/
/*const productoTest = {
  link: "https://www.shibuyacomicstore.com.ar/productos/pokemon-booster-pack-sv-journey-together-ingles-arte-aleatorio/",
  title: "Pokémon Booster Pack S&V Obsidian Flames Inglés (Arte Aleatorio)",
  images:"https://acdn-us.mitiendanube.com/stores/001/989/991/products/pokemon_tcg_scarlet_violetobsid-dd8fdb7a4964322d0a17451143424423-1024-1024.png", 
  priceCurrent: "7650.00",
  priceOld: "8500.00",
  discount: "-10% OFF",
  description: "Description Booster Pack",
  brand: "Nintendo",
  category: "Cartas",
  id: "199652518",
  airtableId: "rec5UQvwkEWajJwNu",
};

crearProducto(productoTest);*/
/*editarProducto("rec5UQvwkEWajJwNu", {priceCurrent: "8000.00"});*/
/*borrarProducto("recVdQYmBYGvAjDUk");
export function initCrudProduct() {
    return;
  
}
*/
const table = document.getElementById('productos-table');
table.innerHTML = '';

productos.forEach(p => {
  const row = document.createElement('tr');

  const nombre = document.createElement('td');
  nombre.textContent = p.nombre;

  const precio = document.createElement('td');
  precio.textContent = p.precio;

  const actions = document.createElement('td');
  const btnEdit = document.createElement('button');
  btnEdit.textContent = 'Editar';
  btnEdit.addEventListener('click', () => editar(p.id));

  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Eliminar';
  btnDelete.addEventListener('click', () => eliminar(p.id));

  actions.append(btnEdit, btnDelete);
  row.append(nombre, precio, actions);
  table.append(row);
});
