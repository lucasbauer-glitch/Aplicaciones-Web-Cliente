import { products } from './productsData.js';

export function searchproducts() {
  const listProducts = products;
  const search = document.querySelector(".search-input");
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
      a.href = `description.html?id=${element.id}`;
      
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