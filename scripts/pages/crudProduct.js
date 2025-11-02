import { obtenerProductos, borrarProducto } from '../core/metodos.js'
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
    stock: producto.fields.stock,
  }));
}

  const productoTest = normalizacion();
  
export function initCrudProduct() {
  function renderCrudProduct(productos) {
    const table = document.getElementById('productos-table');
    table.innerHTML = '';
    const head = document.createElement('thead');
    const rowhead = document.createElement('tr');
    const thImg = document.createElement('th');
    thImg.textContent = 'Imagen';
    const thNombre = document.createElement('th');
    thNombre.textContent = 'Nombre';
    const thStock = document.createElement('th');
    thStock.textContent = 'Stock';
    const thPrecio = document.createElement('th');
    thPrecio.textContent = 'Precio';
    const thAcciones = document.createElement('th');
    thAcciones.textContent = 'Acciones';

    rowhead.append(thImg, thNombre, thStock, thPrecio, thAcciones);
    head.appendChild(rowhead);

    productos.forEach(p => {
      
      table.appendChild(head);

      const row = document.createElement('tr');
      row.dataset.id = p.airtableId;
      const img = document.createElement('td');
      const imageElement = document.createElement('img');
      imageElement.src = p.images[0];
      imageElement.alt = p.title;
      img.classList.add('producto-img');
      img.appendChild(imageElement);
      const nombre = document.createElement('td');
      nombre.textContent = p.title;
      const stock = document.createElement('td');
      stock.textContent = p.stock;
      const precio = document.createElement('td');
      precio.textContent = p.priceCurrent;

      const actions = document.createElement('td');
      const btnEdit = document.createElement('button');
      btnEdit.classList.add('btn-edit');
      btnEdit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
        </svg>
      `;


      const btnDelete = document.createElement('button');
      btnDelete.classList.add('btn-delete');
      btnDelete.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14H6L5 6m3-3h8l1 3H7l1-3Z"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      `;

      actions.append(btnEdit, btnDelete);
      row.append(img, nombre, stock, precio, actions);
      table.append(row);
      });
  }
  renderCrudProduct(productoTest);

  function initProductEvents(productos) {
    const table = document.getElementById("productos-table");

    table.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      if (!row) return;
      const id = row.dataset.id;

      if (e.target.classList.contains("btn-delete")) {
        await borrarProducto(id);
        const nuevos = productos.filter(p => p.airtableId !== id);
        renderCrudProduct(nuevos);
      }

      if (e.target.classList.contains("btn-edit")) {
        console.log(id);
        window.location.href = `edit.html?id=${id}`;
      }
      
    });
    addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-create")) {
        window.location.href = `edit.html`;
      }
    });
    addEventListener("input", (e) => {
      if (e.target.id === "search-product") {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = productos.filter(p =>
          p.title.toLowerCase().includes(searchTerm)
        );
        renderCrudProduct(filteredProducts);
      }
    });
  }
  initProductEvents(productoTest);
}
