export default class Menu {
  constructor(menuMobile, menuDrop) {
    this.menuMobile = document.querySelector(menuMobile);
    this.menuDrop = document.querySelector(menuDrop);

    // bind nas funções para que façam
    // referência a classe

    this.addMenuEvents = this.addMenuEvents.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.activeMenu = this.activeMenu.bind(this);
  }

  addMenuEvents() {
    this.menuMobile.addEventListener('click', this.activeMenu);
    this.menuDrop.addEventListener('click', e => this.closeMenu(e));
  }

  closeMenu(event) {
    if (event.target.tagName === 'a' && !event.target.classList.contains('secundario')) {
      document.body.classList.remove('no-scroll');
      this.menuDrop.classList.remove('ativo');
      this.menuMobile.classList.remove('ativo');
    }
  }


  activeMenu() {
    const isMenuActive = this.menuDrop.classList.toggle('ativo');
    this.menuMobile.classList.toggle('ativo');
    document.body.classList.toggle('no-scroll', isMenuActive);
  }

  init() {
    this.addMenuEvents()
  }

}