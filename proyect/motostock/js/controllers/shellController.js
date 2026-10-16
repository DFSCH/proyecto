/* ==========================================================
   CONTROLADOR: menú lateral desplegable (tableta y celular)
   ========================================================== */
const ShellController = {

  init() {
    const sidebar = document.getElementById('sidebar');
    const botonMenu = document.getElementById('menuBtn');

    botonMenu.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    document.querySelector('main').addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }
};