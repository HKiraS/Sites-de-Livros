export async function getCapitulos(caminho) {
  try {
    const promiseJson = await fetch(caminho)
    const objectJson = await promiseJson.json();
      
    loadCapitulos(objectJson)
    return objectJson;
  } catch (e) {
    console.error("Não foi possivel carregar o arquivo. Erro: ", e)
    alert("Não foi possivel carregar os capitulos.")
  }
}


function loadCapitulos(chapterInfo) {
  const capituloListDiv = document.querySelector('.capitulos-list');
    const numberChapter = document.querySelector('.introducao-cap span')
  
  if (capituloListDiv && numberChapter) {
    capituloListDiv.innerHTML = '';
    numberChapter.innerText = chapterInfo.capitulos.length;

    chapterInfo.capitulos.forEach(capitulo => {
      const link = document.createElement('a');
      link.href = `./capitulo.html?id=${capitulo.id}`;
      link.className = 'capitulo flex';
      const divInterno = document.createElement('div');

      const titulo = document.createElement('h2');
      titulo.className = 'Rubik';
      titulo.innerHTML = `Capítulo ${capitulo.id} - <span class="vermelho">${capitulo.nome}</span>`;


      const data = document.createElement('span');
      data.className = 'capitulo-data';
      data.textContent = capitulo.data;


      divInterno.appendChild(titulo);
      divInterno.appendChild(data);


      const palavras = document.createElement('span');
      palavras.className = 'capitulo-palavras';
      palavras.textContent = capitulo.palavras;

      link.appendChild(divInterno);
      link.appendChild(palavras);

      capituloListDiv.classList.remove('align-center')
      capituloListDiv.appendChild(link);

    });
  }
}