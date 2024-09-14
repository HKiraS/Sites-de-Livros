export default function initMenu() {
  const menuMobile = document.querySelector('.menu-mobile');
  const menuDrop = document.querySelector('.menu');
  
  menuMobile.addEventListener('click', activeMenu);
  
  function activeMenu() {
    const isMenuActive = menuDrop.classList.toggle('ativo');
    menuMobile.classList.toggle('ativo');
    document.body.classList.toggle('no-scroll', isMenuActive);
  }
  
  menuDrop.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && !event.target.classList.contains('secundario')) {
      document.body.classList.remove('no-scroll');
      menuDrop.classList.remove('ativo');
      menuMobile.classList.remove('ativo');
    }
  });
}
