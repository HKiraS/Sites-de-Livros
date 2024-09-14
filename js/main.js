import initModal from './modules/modal.js';
import initMenu from './modules/menu.js';
// import initSubMenu from './modules/submenu.js';
import {getCapitulos} from './modules/opcoesCapitulo.js'

initModal();
initMenu();
// initSubMenu();
getCapitulos("./js/JSON/referencia.JSON");



