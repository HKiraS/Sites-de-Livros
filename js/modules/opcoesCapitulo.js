export default class GetChapters {
  constructor(jsonPath, chapterContainer, chapterNumber) {
    this.jsonPath = jsonPath;
    this.chapterContainer = document.querySelector(chapterContainer);
    this.chapterNumber = document.querySelector(chapterNumber);
  }

  // Adiciona o número de capítulos a um span
  addNumberChapters(chapterInfo) {
    this.chapterNumber.innerText = chapterInfo.capitulos.length;
  }

  validateData(data) {
    // Retorna true se o dado for válido, ou seja, não for "falsy" (false, null, undefined, etc.)
    return data && data !== '';
  }

  addChildren(parent, children) {
    children.forEach(child => {
      const childElement = this.createElement(child);

      // Se o elemento filho for válido, adiciona ao pai
      if (childElement) {
        parent.appendChild(childElement);
      }
    });
  }

  createElement({ name, class: className, text, attribute, children }) {
    // Validação da tag do elemento (se 'name' for falsy, não cria o elemento)
    if (!this.validateData(name)) return null;

    // Cria o elemento com base no 'name' (tag do elemento)
    const element = document.createElement(name);

    // Adiciona as classes, filtrando as classes válidas
    if (this.validateData(className)) {
      className.filter(this.validateData).forEach(cl => element.classList.add(cl));
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
      this.addChildren(element, children);
    }

    return element;
  }

  // Cria as opções
  createOptions(chapterInfo) {
    this.chapterContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    chapterInfo.capitulos.forEach(chapter => {
      const link = this.createElement({
        name: 'a',
        class: ["chapter", "flex"],
        attribute: { name: 'href', value: `./chapter.html?id=${chapter.id}` },
        children: [
          {
            name: 'div',
            class: [],
            children: [
              {
                name: 'h2',
                class: ["Rubik"],
                text: `Chapter ${chapter.id} - `,
                children: [
                  {
                    name: 'span',
                    class: ['red'],
                    text: chapter.name
                  }
                ]
              },
              {
                name: 'span',
                class: ["chapter-date"],
                text: chapter.date
              }
            ]
          },
          {
            name: 'span',
            class: ["chapter-words"],
            text: chapter.words
          }
        ]
      });

      this.chapterContainer.classList.remove('align-center');
      fragment.appendChild(link);
    });

    this.chapterContainer.appendChild(fragment);
  }

  async getInfo(jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const object = await response.json();

      return object;
    } catch (e) {
      console.error("Não foi possível carregar o arquivo. Erro: ", e);
      alert("Não foi possível carregar os capítulos.");
    }
  }

  // Método para inicializar a classe
  async init() {
    if (this.jsonPath && this.chapterContainer && this.chapterNumber) {
      const chapters = await this.getInfo(this.jsonPath);

      this.createOptions(chapters);
      this.addNumberChapters(chapters);
    }
  }
}