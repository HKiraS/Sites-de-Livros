function initModal() {
  const imgs = document.querySelectorAll('.slider-card img');
  const modal = document.querySelector('.modal-container');
  const imgModal = document.querySelector('[data-img-modal]');
  const nomeModal = document.querySelector('.modal-nome');
  const textModal = document.querySelector('.modal-descricao');
  const btnFechar = document.querySelector('.fechar');
  
  if (imgs && imgModal && nomeModal && textModal && btnFechar) {
    
    btnFechar.innerText = 'x';
    
    imgs.forEach((img, index) => {
      img.addEventListener('click', () => {
        addModal(img, index);
      })
    })
    window.addEventListener('click', fecharModal);


    function fecharModal(event) {
      if (event.target === modal || event.target === btnFechar) {
        modal.classList.remove('flex');
      }
    }

    function addModal(img, i) {
      modal.classList.add('flex');
      imgModal.src = img.src;
      nomeModal.innerText = informacoes[i].nome;
      textModal.innerText = informacoes[i].descricao;
    }
  }
};

const informacoes = [
  {
    nome: 'Frisk',
    descricao: 'Uma jovem humana que recentemente caiu no Subsolo, Frisk se encontra em um estranho novo mundo de monstros. Com seus olhos vermelhos marcantes e roupas escuras adornadas com detalhes vermelhos, ela se destaca entre os habitantes. Frisk luta para navegar neste reino desconhecido, insegura se deve fazer amizade com os monstros que encontra ou se defender. Sua jornada pelo Subsolo testará sua determinação e revelará verdades ocultas sobre a natureza das almas.',
},
  {
    nome: 'Chara',
    descricao: 'Outrora humana, agora existindo como uma entidade espectral no Subsolo, Chara abriga um profundo ressentimento em relação à humanidade. Seus olhos vermelhos brilhantes e sorriso sinistro sugerem intenções mais sombrias. Ela busca manipular os outros, sussurrando em suas mentes e empurrando-os para escolhas destrutivas. O objetivo final de Chara é quebrar a barreira e libertar os monstros no mundo da superfície, não importa o custo.',
},
  {
    nome: 'Aventura',
    descricao: 'Hiukgtfgjuffffgh',
},
  {
    nome: 'Chara 2',
    descricao: 'Chara, a primeira criança humana a cair no subsolo, foi acolhida pelos monstros e criada por Asgore e Toriel como um dos seus. No entanto, as cicatrizes deixadas pela crueldade humana a transformaram em alguém com um coração sombrio. Chara secretamente desenvolveu um ódio profundo por ambos, humanos e monstros, acreditando que a única maneira de trazer paz verdadeira era destruir as duas raças.',
},
  {
    nome: 'Rei',
    descricao: 'Hiukgtfgjuffffgh',
},
  {
    nome: 'Rei',
    descricao: 'Hiukgtfgjuffffgh',
},
  {
    nome: 'Brian',
    descricao: 'Um líder humano carismático, mas implacável, do passado distante, Brian foi fundamental para confinar os monstros ao Subsolo. Seus olhos azuis penetrantes e presença imponente permitiram que ele reunisse humanos contra monstros, alimentando o medo e o preconceito. As ações de Brian moldaram a atual divisão entre humanos e monstros, deixando um legado complexo que ainda afeta ambas as sociedades séculos depois. Alguns o veem como um protetor, outros como um tirano - a verdade pode estar em algum lugar entre esses extremos.',
},
  {
    nome: 'Rei',
    descricao: 'Hiukgtfgjuffffgh',
},
  {
    nome: 'Rei',
    descricao: 'hkdmmdmsnsnssnsnsnsnsbbsbsbdndjd',
}, ]

function initCronometro() {
  const btnPlay = document.querySelector('[data-play]')
  const btnPause = document.querySelector('[data-pause]')
  const btnResete = document.querySelector('[data-resete]')
  const tempo = document.querySelector('[data-time]');
  if (btnPlay && btnPause && btnResete) {
    let time = 0;
    let cron;

    btnPlay.addEventListener('click', iniciarCron)
    btnPause.addEventListener('click', pauseCron)
    btnResete.addEventListener('click', reseCron)

    function iniciarCron() {
      console.log(time)
      cron = setInterval(() => {
        time += 1;
        tempo.innerText = 'Tempo: ' + time;
        console.log(time)
      }, 1000)
      btnPlay.innerText = 'Continuar';
      btnPlay.setAttribute("disabled", '');
    }

    function pauseCron() {
      clearInterval(cron)
      tempo.innerText = 'Tempo: ' + time;
      btnPlay.removeAttribute('disabled')
    }

    function reseCron() {
      time = 0;
      pauseCron()
      btnPlay.innerText = 'Iniciar';
    }
  }
}







// inits

initModal();
initCronometro();