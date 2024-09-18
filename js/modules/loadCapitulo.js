import GetChapters from './chapterOptions.js';

const chapterManager = new GetChapters();

const urlParams = new URLSearchParams(window.location.search);
let currentChapterId = +urlParams.get('id') || 1;
const nextButton = document.querySelector('#btn-next');
const previousButton = document.querySelector('#btn-previous');
const chapterMenu = document.querySelector('#chapters-menu');

function readTime(text) {
  const chapterTime = document.querySelector('.chapter-time span');
  const wordCount = text.replace(/\n+/g, " ").split(' ').length;
  const time = Math.round(wordCount / 200);
  chapterTime.innerText = time + ' minutes';
}

function mapChaptersById(chaptersArray) {
  return chaptersArray.reduce((acc, chapter) => {
    acc[chapter.id] = chapter;
    return acc;
  }, {});
}

// Função que cria as opções de capítulos e sincroniza com o capítulo atual
function createOptions(obj) {
  chapterMenu.innerHTML = '';

  obj.capitulos.forEach((chapter) => {
    const option = document.createElement('option');
    option.text = `Chapter ${chapter.id}`;
    option.value = chapter.id;
    if (chapter.id == currentChapterId) {
      option.selected = true;
    }
    chapterMenu.appendChild(option);
  });
}

// Função para atualizar a seleção do menu de capítulos
function updateChapterSelection() {
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
  history.pushState(null, '', `./chapter.html?id=${chapterId}`);

  updateChapterSelection();
  // Atualizar o conteúdo do capítulo dinamicamente
  await displayChapterText(chaptersMap);
  updateNavigationButtons(chaptersMap);
}

function updateNavigationButtons(chaptersMap) {
  const totalChapters = Object.keys(chaptersMap).length;

  nextButton.disabled = currentChapterId === totalChapters;
  previousButton.disabled = currentChapterId === 1;
}

async function displayChapterText(chaptersMap) {
  const chapterTextContainer = document.querySelector('.chapter-text');
  const title = document.querySelector('#title-chapter');
  const chapter = chaptersMap[currentChapterId];

  if (chapter) {
    try {
      const chapterResponse = await fetch(chapter.path);
      const chapterContent = await chapterResponse.text();
      const img = document.querySelector('.chapter-image');
      const imgBg = document.querySelector('.chapter-image-blur');
      const publishDate = document.querySelector('.publish-date');
      const paragraphs = chapterContent.split('/n');

      readTime(chapterContent);

      chapterTextContainer.innerHTML = '';
      title.innerText = `Chapter ${chapter.id} -  ${chapter.name}`;
      publishDate.innerHTML = `Published on: <span class="red">${chapter.date}</span>`;

      img.setAttribute('src', chapter.cover);
      imgBg.style.backgroundImage = `url('${chapter.cover}')`;

      chapterTextContainer.classList.remove('flex');
      chapterTextContainer.classList.remove('align-center');

      paragraphs.forEach((paragraphText) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.innerText = paragraphText;
        chapterTextContainer.appendChild(paragraphElement);
      });
    } catch (error) {
      console.error('Error loading chapter. Error: ', error);
      alert('Error loading chapter. Please contact support.');
    }
  } else {
    alert('Chapter not found. Redirecting to the home page.');
    window.location.href = './index.html';
  }
}

async function initLoadChapters() {
  try {
    const chaptersData = await chapterManager.getInfo("./assets/JSON/reference.JSON");
    const chaptersMap = mapChaptersById(chaptersData.capitulos);

    // Adiciona listener para quando o menu de seleção for alterado
    chapterMenu.addEventListener('change', async (event) => {
      currentChapterId = +event.target.value;
      await updateChapter(currentChapterId, chaptersMap);
    });
    
    previousButton.addEventListener('click', async () => {
      currentChapterId--;
      await updateChapter(currentChapterId, chaptersMap);
    });

    nextButton.addEventListener('click', async () => {
      currentChapterId++;
      await updateChapter(currentChapterId, chaptersMap);
    });

    // Carrega o capítulo atual na inicialização
    displayChapterText(chaptersMap);
    updateNavigationButtons(chaptersMap);
    createOptions(chaptersData);
  } catch (error) {
    console.error("Unable to load chapters. Error: ", error);
    alert('Unable to load chapters.');
  }
}

// Evento para lidar com o botão de voltar/avançar do navegador
window.addEventListener('popstate', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentChapterId = +urlParams.get('id') || 1;

  const chaptersData = await chapterManager.getInfo("./assets/JSON/reference.JSON");
  const chaptersMap = mapChaptersById(chaptersData.capitulos);

  // Atualiza o capítulo de acordo com a navegação do navegador
  await updateChapter(currentChapterId, chaptersMap);
});

initLoadChapters();