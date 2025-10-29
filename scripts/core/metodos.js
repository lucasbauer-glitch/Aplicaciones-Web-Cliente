

export async function obtenerProductos() {
     try {
    const respuesta = await fetch(`https://api.airtable.com/v0/${YOUR_BASE_ID}/${YOUR_TABLE_NAME}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const datos = await respuesta.json();
    console.log('Productos:', datos);
    return datos;

  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

export async function crearProducto(newproducto) {
    try {
      const respuesta = await fetch(`https://api.airtable.com/v0/${YOUR_BASE_ID}/${YOUR_TABLE_NAME}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records:[{
            fields: {
              link: newproducto.link,
              title: newproducto.title,
              images: newproducto.images, 
              priceCurrent: newproducto.priceCurrent,
              priceOld: newproducto.priceOld,
              discount: newproducto.discount,
              description: newproducto.description,
              brand: newproducto.brand,
              category: newproducto.category,
              id: newproducto.id
            },
          },
        ],
      }),
    });
    if(!respuesta.ok){
        throw new Error ('Error al crear el producto');
    }
    const datos = await respuesta.json();
    console.log('Producto creado:', datos);
    return datos;
  } catch (error) {
    console.error('Error al crear el producto:', error);
  }
}

export async function editarProducto(id, camposActualizados) {
    try {
      const respuesta = await fetch(`https://api.airtable.com/v0/${YOUR_BASE_ID}/${YOUR_TABLE_NAME}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           records: [{
            id: id, 
            fields: camposActualizados 
            }],
          }),
        });
    const datos = await respuesta.json();
    console.log('Producto editado:', datos);
    return datos;
  } catch (error) {
    console.error('Error al editar el producto:', error);
  }
}

export async function borrarProducto(id) {
    try {
      const queryParams = new URLSearchParams({ 'records[]': id });
      const respuesta = await fetch(`https://api.airtable.com/v0/${YOUR_BASE_ID}/${YOUR_TABLE_NAME}?${queryParams}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      });
    const datos = await respuesta.json();
    console.log('Producto borrado:', datos);
    return datos;
  } catch (error) {
    console.error('Error al borrar el producto:', error);
  }
}