export default class GetCapitulos {
  constructor(jsonPath, containerSelector, chapterCountSelector) {
    this.jsonPath = jsonPath;
    this.container = document.querySelector(containerSelector);
    this.chapterCountElement = document.querySelector(chapterCountSelector);
  }

  // Adiciona o número de capítulos a um span
  setChapterCount(chapterData) {
    this.chapterCountElement.innerText = chapterData.capitulos.length;
  }

  validateData(data) {
    // Retorna true se o dado for válido, ou seja, não for "falsy" (false, null, undefined, etc.)
    return data && data !== '';
  }

  appendChildren(parent, children) {
    children.forEach(child => {
      const childElement = this.createElement(child);

      // Se o elemento filho for válido, adiciona ao pai
      if (childElement) {
        parent.appendChild(childElement);
      }
    });
  }

  createElement({ name, classe, text, attribute, children }) {
    // Validação da tag do elemento (se 'name' for falsy, não cria o elemento)
    if (!this.validateData(name)) return null;

    // Cria o elemento com base no 'name' (tag do elemento)
    const element = document.createElement(name);

    // Adiciona as classes, filtrando as classes válidas
    if (this.validateData(classe)) {
      classe.filter(this.validateData).forEach(cl => element.classList.add(cl));
    }

    // Adiciona o texto, se for válido
    if (this.validateData(text)) {
      element.textContent = text;
    }

    // Adiciona os atributos, se forem válidos
    if (this.validateData(attribute) && attribute.name) {
      element.setAttribute(attribute.name, attribute.value || '');
    }

    if (this.validateData(children)) {
      this.appendChildren(element, children);
    }

    return element;
  }

  // Cria as opções 
  generateOptions(chapterData) {
    this.container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    chapterData.capitulos.forEach(chapter => {
      const link = this.createElement({
        name: 'a',
        classe: ["capitulo", "flex"],
        attribute: { name: 'href', value: `./capitulo.html?id=${chapter.id}` },
        children: [
          {
            name: 'div',
            classe: [],
            children: [
              {
                name: 'h2',
                classe: ["Rubik"],
                text: `Capítulo ${chapter.id} - `,
                children: [
                  {
                    name: 'span',
                    classe: ['vermelho'],
                    text: chapter.nome
                  }
                ]
              },
              {
                name: 'span',
                classe: ["capitulo-data"],
                text: chapter.data
              }
            ]
          },
          {
            name: 'span',
            classe: ["capitulo-palavras"],
            text: chapter.palavras
          }
        ]
      });

      this.container.classList.remove('align-center');
      fragment.appendChild(link);
    });

    this.container.appendChild(fragment);
  }

  async fetchInfo(jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Não foi possível carregar o arquivo. Erro: ", error);
      alert("Não foi possível carregar os capítulos.");
    }
  }

  // Método para inicializar a classe
  async init() {
    if (this.jsonPath && this.container && this.chapterCountElement) {
      const chapters = await this.fetchInfo(this.jsonPath);

      this.generateOptions(chapters);
      this.setChapterCount(chapters);
    }
  }
}