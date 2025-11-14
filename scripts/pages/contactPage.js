const TOKEN_AIRTABLE ="patDxOzwRcvMJdX26.657fe914ec08c44dd3cc8d8734b8a7c0fe7c990594c69ee6510c6bf760dc7c24";
const YOUR_BASE_ID = 'appNI85L891WjcI05';
const YOUR_TABLE_NAME = 'tblLOKrbH6mUYjoyQ';

function showCartAlert(message="Formulario enviado correctamente"){
    const alertBox = document.getElementById("cart-alert");
    if(!alertBox) return;

    alertBox.textContent = message;
    alertBox.classList.add("show");

    setTimeout(()=>{
      alertBox.classList.remove("show");
    }, 2000);
  }

async function enviarFormulario(newform) {
    try {
      const respuesta = await fetch(`https://api.airtable.com/v0/${YOUR_BASE_ID}/${YOUR_TABLE_NAME}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN_AIRTABLE}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records:[{
            fields: {
              nombre: newform.nombre,
              email: newform.email,
              mensaje: newform.mensaje, 
            },
          },
        ],
      }),
    });
    if(!respuesta.ok){
        throw new Error ('Error al enviar el formulario');
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}
export async function initContactPage() {
    const form = document.getElementById("form-contacto");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        await enviarFormulario(data);
        showCartAlert("Formulario enviado correctamente");
        form.reset();
    });

}