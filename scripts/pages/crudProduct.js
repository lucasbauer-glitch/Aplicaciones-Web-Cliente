import { obtenerProductos, crearProducto, editarProducto, borrarProducto } from '../core/metodos.js'
const productosResponse = await obtenerProductos();

export function normalizacion() {
  return productosResponse.records.map(producto => ({
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
  }));
}


/*crearProducto(productoTest);*/
/*editarProducto("rec5UQvwkEWajJwNu", {priceCurrent: "8000.00"});*/
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
  };*/
export function initCrudProduct() {
  const productoTest = normalizacion();
  console.log('productoTest:', productoTest);
  function renderCrudProduct(productos) {
    const table = document.getElementById('productos-table');
    table.innerHTML = '';
    const head = document.createElement('thead');
    const rowhead = document.createElement('tr');
    const thImg = document.createElement('th');
    thImg.textContent = 'Imagen';
    const thNombre = document.createElement('th');
    thNombre.textContent = 'Nombre';
    const thPrecio = document.createElement('th');
    thPrecio.textContent = 'Precio';
    const thAcciones = document.createElement('th');
    thAcciones.textContent = 'Acciones';
    rowhead.append(thImg, thNombre, thPrecio, thAcciones);
    head.appendChild(rowhead);

    productos.forEach(p => {
      
      table.appendChild(head);

      const row = document.createElement('tr');

      const img = document.createElement('td');
      const imageElement = document.createElement('img');
      imageElement.src = p.images[0];
      imageElement.alt = p.title;
      imageElement.style.width = '50px';
      img.appendChild(imageElement);
      const nombre = document.createElement('td');
      nombre.textContent = p.title;

      const precio = document.createElement('td');
      precio.textContent = p.priceCurrent;

      const actions = document.createElement('td');
      const btnEdit = document.createElement('button');
      btnEdit.textContent = 'Editar';
      btnEdit.addEventListener('click', () => editar(p.airtableId));

      const btnDelete = document.createElement('button');
      btnDelete.textContent = 'Eliminar';
       btnDelete.addEventListener('click', () => {
        borrarProducto(p.airtableId);
        productos = productos.filter(prod => prod.airtableId !== p.airtableId);
        renderCrudProduct();
      });
      actions.append(btnEdit, btnDelete);
      row.append(img, nombre, precio, actions);
      table.append(row);
      });
  }
  renderCrudProduct(productoTest);
}