const urlParams = new URLSearchParams(window.location.search);
let chapterId = +urlParams.get('id') || 1;
const btnNext = document.querySelector('#btn-next');
const btnPrevious = document.querySelector('#btn-previous');



async function initLoadChapters() {
  try {
    const response = await fetch("./js/JSON/referencia.JSON");
    const chaptersData = await response.json();
    const chaptersMap = mapChaptersById(chaptersData.capitulos);

    displayChapterText(chaptersMap);
    changeChapter(chaptersData);
  } catch (error) {
    console.error("Não foi possível carregar os capítulos. Erro: ", error);
    alert('Não foi possível carregar os capítulos.');
  }

  function mapChaptersById(chaptersArray) {
    return chaptersArray.reduce((acc, chapter) => {
      acc[chapter.id] = chapter;
      return acc;
    }, {});
  }


  async function displayChapterText(chaptersMap) {
    const chapterTextContainer = document.querySelector('.capitulo-texto');
    const title = document.querySelector('#title-chapter');


    const chapter = chaptersMap[chapterId];


    if (chapter) {
      try {
        const chapterResponse = await fetch(chapter.caminho);
        const chapterContent = await chapterResponse.text();
        const img = document.querySelector('.chapter-image');
        const imgBg = document.querySelector('.chapter-image-blur')
        const data = document.querySelector('.publish-date');
        const paragraphs = chapterContent.split('/n');
        
        readTime(chapterContent)

        chapterTextContainer.innerHTML = '';


        title.innerText = 'Capítulo ' + chapter.id + ' - ' + chapter.nome;
        img.setAttribute('src', chapter.capa)
        imgBg.style.backgroundImage = `url('${chapter.capa}')`
        data.innerHTML = `Publicado em: <span class="vermelho">${chapter.data}</span>`

        chapterTextContainer.classList.remove('flex')
        chapterTextContainer.classList.remove('align-center')

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

  async function changeChapter(info) {
  
    if (chapterId === info.capitulos.length) {
      btnNext.setAttribute('disabled', '')
    }
    
    if (chapterId === 1) {
      btnPrevious.setAttribute('disabled', '')
    }
  
    btnPrevious.addEventListener('click', previousChapter)
    btnNext.addEventListener('click', nextChapter)
  
    function nextChapter() {
      chapterId++;
      window.location.href = `./capitulo.html?id=${chapterId}`
      if (chapterId === info.capitulos.length) {
        btnNext.setAttribute('disabled', '')
      }
      btnPrevious.removeAttribute('disabled');
    }
  
    function previousChapter() {
      chapterId--;
      window.location.href = `./capitulo.html?id=${chapterId}`
      btnNext.removeAttribute('disabled');
      if (chapterId === 1) {
        btnPrevious.setAttribute('disabled', '');
      }
    }
  }
  

  async function readTime(text) {
    const chapterTime = document.querySelector('.chapter-time span');
    const wordCount = text.replace(/\n+/g, " ").split(' ').length;
    const time = Math.round(wordCount / 200 );
    
    chapterTime.innerText = time + ' minutos';
  }
}




initLoadChapters();