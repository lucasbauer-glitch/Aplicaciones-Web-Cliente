import { getProducts } from "./core/productStore.js";

export async function searchproducts() {
  const listProducts = await getProducts();
  const search = document.querySelector(".search-input");
  if (!search) return;
  const resultados = document.querySelector(".resultados");

  function buscar (texto) {
      return listProducts.filter( p => 
          p.title.toLocaleLowerCase().includes(texto.toLocaleLowerCase()))
  }

  function mostrarResultado(encontrado) {
    resultados.innerHTML = "";
    encontrado.forEach(element => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      
      a.textContent = element.title;
      a.href = `description.html?id=${element.airtableId}`;
      
      li.appendChild(a);
      resultados.appendChild(li);
    });
  }

  search.addEventListener("input", (e)=>{
      const texto = e.target.value;
      if(texto.length == 0) return mostrarResultado([])
      const encontrado= buscar(texto);
      mostrarResultado(encontrado); 
  });

}