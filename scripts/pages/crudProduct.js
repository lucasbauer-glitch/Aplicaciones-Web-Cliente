import { obtenerProductos, borrarProducto } from "../core/metodos.js";


export function normalizacion(productosResponse) {
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

function renderCrudProduct(productos) {
  const table = document.getElementById("productos-table");
  table.innerHTML = "";

  const head = document.createElement("thead");
  const rowhead = document.createElement("tr");
  ["Imagen", "Nombre", "Stock", "Precio", "Acciones"].forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    rowhead.appendChild(th);
  });
  head.appendChild(rowhead);
  table.appendChild(head);

  const body = document.createElement("tbody");

  productos.forEach(p => {
    const row = document.createElement("tr");
    row.dataset.id = p.airtableId;

    const img = document.createElement("td");
    img.classList.add("producto-img");
    const imageElement = document.createElement("img");
    imageElement.src = p.images[0] || "";
    imageElement.alt = p.title;
    img.appendChild(imageElement);

    const nombre = document.createElement("td");
    nombre.classList.add("producto-nombre");
    nombre.datalabel = "Nombre";
    nombre.textContent = p.title;

    const stock = document.createElement("td");
    stock.datalabel = "Stock";
    stock.textContent = p.stock;

    const precio = document.createElement("td");
    precio.datalabel = "Precio";
    precio.textContent = p.priceCurrent;

    const actions = document.createElement("td");

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn-edit");
    btnEdit.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    `;

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-delete");
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
    row.setAttribute("data-nombre", p.title);
    row.setAttribute("data-stock", p.stock);
    row.setAttribute("data-precio", p.priceCurrent);
    body.appendChild(row);
  });

  table.appendChild(body);
}

function initProductEvents(productos) {
  const table = document.getElementById("productos-table");

  table.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const row = btn.closest("tr");
    if (!row) return;
    const id = row.dataset.id;

    if (btn.classList.contains("btn-delete")) {
      if (confirm("¿Seguro que querés eliminar este producto?")) {
        await borrarProducto(id);
        const nuevos = productos.filter(p => p.airtableId !== id);
        renderCrudProduct(nuevos);
      }
    }

    if (btn.classList.contains("btn-edit")) {
      window.location.href = `edit.html?id=${id}`;
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-create");
    if (btn) window.location.href = "edit.html";
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "search-product") {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = productos.filter(p =>
        p.title.toLowerCase().includes(searchTerm)
      );
      renderCrudProduct(filtered);
    }
  });
}
export async function initCrudProduct() {
  const table = document.getElementById("productos-table");
  table.innerHTML = "<tr><td colspan='5'>Cargando productos...</td></tr>";

  try {
    const productosResponse = await obtenerProductos();
    const productoTest = normalizacion(productosResponse);
    renderCrudProduct(productoTest);
    initProductEvents(productoTest);
  } catch (err) {
    console.error("Error al cargar productos:", err);
    table.innerHTML = "<tr><td colspan='5'>Error al cargar productos.</td></tr>";
  }
}


