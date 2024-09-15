export class getCapitulos {
  constructor(pathJson, chapterContainer, classes, numberChapter) {
    this.pathJson = pathJson;
    this.chapterContainer = document.querySelector(chapterContainer);
    this.classes = classes;
    this.numberChapter = document.querySelector(numberChapter);
  }


  // Adiciona o numero de capitulos a um span 
  addNumberChapters(chapterInfo) {
    this.numberChapter.innerText = chapterInfo.capitulos.length;
  }


  // Cria as opções 
  createOptions(chapterInfo) {
    
    this.chapterContainer.innerHTML = '';
    const fragment = document.createDocumentFragment()
    
    chapterInfo.capitulos.forEach(capitulo => {

      const link = document.createElement('a');
      link.href = `./capitulo.html?id=${capitulo.id}`;
      link.className = this.classes.classContainer;
      const divInterno = document.createElement('div');

      const title = document.createElement('h2');
      title.className = this.classes.classTitle;
      title.innerHTML = `Capítulo ${capitulo.id} - <span class="vermelho">${capitulo.nome}</span>`;

      const data = document.createElement('span');
      data.className = this.classes.classData;
      data.textContent = capitulo.data;

      divInterno.appendChild(title);
      divInterno.appendChild(data);

      const words = document.createElement('span');
      words.className = this.classes.classNumberWord;
      words.textContent = capitulo.palavras;

      link.appendChild(divInterno);
      link.appendChild(words);

      this.chapterContainer.classList.remove('align-center')
      fragment.appendChild(link);
    })
    
    this.chapterContainer.appendChild(fragment)
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