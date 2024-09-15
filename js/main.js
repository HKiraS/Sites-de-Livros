 import initModal from './modules/modal.js';
import { Menu }from './modules/menu.js';
// import initSubMenu from './modules/submenu.js';
import { GetCapitulos } from './modules/opcoesCapitulo.js'

//initModal();
//initMenu();
// initSubMenu();

const menu = new Menu('.menu-mobile', '.menu')


const classesOption = {
  classContainer: 'capitulo flex',
  classTitle: 'Rubik',
  classData: 'capitulo-data',
  classNumberWord: 'capitulo-palavras',
}

const getChapter = new GetCapitulos("./assets/JSON/referencia.JSON", '.capitulos-list', classesOption, '.introducao-cap span');

getChapter.init()
menu.init()