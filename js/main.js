 import initModal from './modules/modal.js';
import initMenu from './modules/menu.js';
// import initSubMenu from './modules/submenu.js';
import { getCapitulos } from './modules/opcoesCapitulo.js'

//initModal();
//initMenu();
// initSubMenu();


const classesOption = {
  classContainer: 'capitulo flex',
  classTitle: 'Rubik',
  classData: 'capitulo-data',
  classNumberWord: 'capitulo-palavras',
}


const getChapter = new getCapitulos("./assets/JSON/referencia.JSON", '.capitulos-list', classesOption, '.introducao-cap span');

getChapter.init()