import { obtenerUnProducto, editarProducto } from "../core/metodos.js";

export async function initEditForm() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("ID de producto no encontrado");
    return;
  }

  const producto = await obtenerUnProducto(id);
  const fields = producto.fields;

  const form = document.getElementById("form-edit");
  Object.keys(fields).forEach(key => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = fields[key] || "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    await editarProducto(id, data);
    alert("Producto actualizado correctamente");
    window.location.href = "index.html";
  });
}

initEditForm();
