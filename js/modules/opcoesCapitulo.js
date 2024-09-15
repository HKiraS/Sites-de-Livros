export class getCapitulos {
  constructor(pathJson, chapterContainer, classes, numberChapter) {
    this.pathJson = pathJson;
    this.chapterContainer = document.querySelector(chapterContainer);
    this.classes = classes;
    this.numberChapter = document.querySelector(numberChapter);
  }


  // Adiciona o numero de capitulos a um span 
  addNumberChapters(chapterInfo) {
    if (this.numberChapter) {
      this.numberChapter.innerText = chapterInfo.capitulos.length;
    }
  }
  

  // Cria as opções 
  createOptions(chapterInfo) {
    this.chapterContainer.innerHTML = '';
    chapterInfo.capitulos.forEach(capitulo => {
      
      const link = document.createElement('a');
      link.href = `./capitulo.html?id=${capitulo.id}`;
      link.className = this.classes.classContainer;
      const divInterno = document.createElement('div');

      const titulo = document.createElement('h2');
      titulo.className = this.classes.classTitle;
      titulo.innerHTML = `Capítulo ${capitulo.id} - <span class="vermelho">${capitulo.nome}</span>`;

      const data = document.createElement('span');
      data.className = this.classes.classData;
      data.textContent = capitulo.data;

      divInterno.appendChild(titulo);
      divInterno.appendChild(data);

      const palavras = document.createElement('span');
      palavras.className = this.classes.classNumberWord;
      palavras.textContent = capitulo.palavras;

      link.appendChild(divInterno);
      link.appendChild(palavras);

      this.chapterContainer.classList.remove('align-center')
      this.chapterContainer.appendChild(link);

    });
  }

  async getInfo(pathJson) {
    try {
      const promise = await fetch(pathJson);
      const object = await promise.json();
      
      return object;
    } catch (e) {
      console.error("Não foi possivel carregar o arquivo.   Erro: ", e)
      alert("Não foi possivel carregar os capitulos.");
    }
  }

  async init() {
    if (this.pathJson && this.classes && this.chapterContainer && this.numberChapter) {
      
    const chapters = await this.getInfo(this.pathJson);
    
    this.createOptions(chapters);
    this.addNumberChapters(chapters);
    } 
  }
}