import GetCapitulos from './opcoesCapitulo.js';

const capitulosManager = new GetCapitulos();

const urlParams = new URLSearchParams(window.location.search);
let currentChapterId = +urlParams.get('id') || 1;
const nextButton = document.querySelector('#btn-next');
const previousButton = document.querySelector('#btn-previous');
const chapterMenu = document.querySelector('#capitulos-menu');

function calculateReadTime(text) {
  const timeElement = document.querySelector('.chapter-time span');
  const wordCount = text.replace(/\n+/g, " ").split(' ').length;
  const time = Math.round(wordCount / 200);
  timeElement.innerText = time + ' minutos';
}

function mapChaptersById(chaptersArray) {
  return chaptersArray.reduce((acc, chapter) => {
    acc[chapter.id] = chapter;
    return acc;
  }, {});
}

// Função que cria as opções de capítulos e sincroniza com o capítulo atual
function populateChapterMenu(chaptersData) {
  chapterMenu.innerHTML = '';

  chaptersData.capitulos.forEach((chapter) => {
    const option = document.createElement('option');
    option.text = `Capítulo ${chapter.id}`;
    option.value = chapter.id;
    if (chapter.id === currentChapterId) {
      option.selected = true;
    }
    chapterMenu.appendChild(option);
  });
}

// Função para atualizar a seleção do menu de capítulos
function updateChapterMenuSelection() {
  const options = chapterMenu.options;
  for (let i = 0; i < options.length; i++) {
    if (+options[i].value === currentChapterId) {
      options[i].selected = true;
      break;
    }
  }
}

async function updateChapter(chapterId, chaptersMap) {
  // Atualizar a URL sem recarregar a página
  history.pushState(null, '', `./capitulo.html?id=${chapterId}`);

  // Atualizar a seleção no menu
  updateChapterMenuSelection();

  // Atualizar o conteúdo do capítulo dinamicamente
  await loadChapterText(chaptersMap);

  // Atualizar os botões "próximo" e "anterior"
  updateNavigationButtons(chaptersMap);
}

function updateNavigationButtons(chaptersMap) {
  const totalChapters = Object.keys(chaptersMap).length;

  nextButton.disabled = currentChapterId === totalChapters;
  previousButton.disabled = currentChapterId === 1;
}

async function loadChapterText(chaptersMap) {
  const chapterTextContainer = document.querySelector('.capitulo-texto');
  const titleElement = document.querySelector('#title-chapter');
  const chapter = chaptersMap[currentChapterId];

  if (chapter) {
    try {
      const response = await fetch(chapter.caminho);
      const content = await response.text();
      const img = document.querySelector('.chapter-image');
      const imgBg = document.querySelector('.chapter-image-blur');
      const publishDateElement = document.querySelector('.publish-date');
      const paragraphs = content.split('\n');

      calculateReadTime(content);

      chapterTextContainer.innerHTML = '';
      titleElement.innerText = `Capítulo ${chapter.id} - ${chapter.nome}`;
      publishDateElement.innerHTML = `Publicado em: <span class="vermelho">${chapter.data}</span>`;

      img.setAttribute('src', chapter.capa);
      imgBg.style.backgroundImage = `url('${chapter.capa}')`;

      chapterTextContainer.classList.remove('flex');
      chapterTextContainer.classList.remove('align-center');

      paragraphs.forEach((paragraphText) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.innerText = paragraphText;
        chapterTextContainer.appendChild(paragraphElement);
      });
    } catch (error) {
      console.error('Erro ao carregar o capítulo. Erro: ', error);
      alert('Erro ao carregar o capítulo. Por favor, entre em contato.');
    }
  } else {
    alert('Capítulo não encontrado. Redirecionando para a página inicial.');
    window.location.href = './index.html';
  }
}

async function initializeChapters() {
  try {
    const chaptersData = await capitulosManager.getInfo("./assets/JSON/referencia.JSON");
    const chaptersMap = mapChaptersById(chaptersData.capitulos);

    // Adiciona listener para quando o menu de seleção for alterado
    chapterMenu.addEventListener('change', async (event) => {
      currentChapterId = +event.target.value;
      await updateChapter(currentChapterId, chaptersMap);
    });

    // Adiciona listeners para os botões "Anterior" e "Próximo"
    previousButton.addEventListener('click', async () => {
      if (currentChapterId > 1) {
        currentChapterId--;
        await updateChapter(currentChapterId, chaptersMap);
      }
    });

    nextButton.addEventListener('click', async () => {
      if (currentChapterId < Object.keys(chaptersMap).length) {
        currentChapterId++;
        await updateChapter(currentChapterId, chaptersMap);
      }
    });

    // Carrega o capítulo atual na inicialização
    await loadChapterText(chaptersMap);
    updateNavigationButtons(chaptersMap);
    populateChapterMenu(chaptersData);
  } catch (error) {
    console.error("Não foi possível carregar os capítulos. Erro: ", error);
    alert('Não foi possível carregar os capítulos.');
  }
}

// Evento para lidar com o botão de voltar/avançar do navegador
window.addEventListener('popstate', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentChapterId = +urlParams.get('id') || 1;

  try {
    const chaptersData = await capitulosManager.getInfo("./assets/JSON/referencia.JSON");
    const chaptersMap = mapChaptersById(chaptersData.capitulos);

    // Atualiza o capítulo de acordo com a navegação do navegador
    await updateChapter(currentChapterId, chaptersMap);
  } catch (error) {
    console.error("Não foi possível carregar os capítulos. Erro: ", error);
    alert('Não foi possível carregar os capítulos.');
  }
});

initializeChapters();