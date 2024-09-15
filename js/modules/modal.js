export default class Modal {
  constructor() {
    this.slides = document.querySelectorAll('.slider-card');
    this.modal = document.querySelector('.modal-container');
    this.imgModal = document.querySelector('[data-img-modal]');
    this.nomeModal = document.querySelector('.modal-nome');
    this.textModal = document.querySelector('.modal-descricao');
    this.btnFechar = document.querySelector('.fechar');

    // bind nas funções para que façam
    // referência à classe
    this.addModal = this.addModal.bind(this);
    this.addModalEvents = this.addModalEvents.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event) {
    if (event.target === this.modal || event.target === this.btnFechar) {
      this.modal.classList.add('transicao');
      setTimeout(() => {
        this.modal.classList.remove('flex');
        this.modal.classList.remove('transicao');
      }, 200);
    }
  }

  addModal(slide, i) {
    const img = slide.querySelector("img");
    const texto = informacoes[i].descricao.split('\n');

    // Limpa o texto modal
    this.textModal.innerText = '';

    texto.forEach((item) => {
      const paragrafo = document.createElement('p');
      this.textModal.appendChild(paragrafo);
      paragrafo.innerText = item;
    });

    this.imgModal.src = img.src;
    this.nomeModal.innerText = informacoes[i].nome;
  }

  addModalEvents() {
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        this.modal.classList.add('flex');
        this.addModal(slide, index);
      });
    });


    this.modal.addEventListener('click', this.closeModal);
  }

  init() {
    if (this.modal && this.slides && this.btnFechar && this.textModal && this.nomeModal && this.imgModal) {
      this.addModalEvents();
    } 
  }
}



// Um arquivo JSON seria melhor do que essa forma que utilizei

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
    descricao: 'Um líder humano carismático, mas implacável, do passado distante, Brian foi fundamental para confinar os monstros ao Subsolo. Seus olhos azuis penetrantes e presença imponente permitiram que ele reunisse humanos contra monstros, alimentando o medo e o preconceito. As ações de Brian moldaram a atual divisão entre humanos e monstros, deixando um legado complexo que ainda afeta ambas as sociedades séculos depois. Alguns o veem como um protetor, outros como um tirano - a verdade pode estar em algum lugar entre esses extremos. \n Um líder humano carismático, mas implacável, do passado distante, Brian foi fundamental para confinar os monstros ao Subsolo. Seus olhos azuis penetrantes e presença imponente permitiram que ele reunisse humanos contra monstros, alimentando o medo e o preconceito. As ações de Brian moldaram a atual divisão entre humanos e monstros, deixando um legado complexo que ainda afeta ambas as sociedades séculos depois. Alguns o veem como um protetor, outros como um tirano - a verdade pode estar em algum lugar entre esses extremos.',
},
  {
    nome: 'Rei',
    descricao: 'Hiukgtfgjuffffgh',
},
  {
    nome: 'Rei',
    descricao: 'hkdmmdmsnsnssnsnsnsnsbbsbsbdndjd',
}, ]