import { obtenerUnProducto, editarProducto, crearProducto} from "../core/metodos.js";


export async function initEditForm() {

  function showCartAlert(message="Producto agregado al carrito"){
    const alertBox = document.getElementById("cart-alert");
    if(!alertBox) return;

    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(()=>{
      alertBox.classList.remove("show");
    }, 2000);
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const form = document.getElementById("form-edit");

  if (id) {
  const producto = await obtenerUnProducto(id);
  const fields = producto.fields;

  Object.keys(fields).forEach(key => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) input.value = fields[key] || "";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    await editarProducto(id, data);
    showCartAlert("Producto actualizado correctamente");
    setTimeout(() => window.location.href = "crudProduct.html", 2000);
  });
  } else {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      await crearProducto(data);
      showCartAlert("Producto creado correctamente");
      setTimeout(() => window.location.href = "crudProduct.html", 2000);
    });
  }
}

initEditForm();
