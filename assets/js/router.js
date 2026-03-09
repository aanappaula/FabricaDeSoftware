class Router {
  constructor() {
    this.routes = {
      '': 'home',
      'mapa': 'mapa',
      'solicitar': 'solicitar',
      'denunciar': 'denunciar',
      'perfil': 'perfil',
      'educativo': 'educativo'
    };
    this.controllers = {
      'home': new HomeController(),
      'mapa': new MapaController(),
      'solicitar': new SolicitarController(),
      'denunciar': new DenunciarController(),
      'perfil': new PerfilController(),
      'educativo': new EducativoController()
    };
    this.currentController = null;
  }
  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  }
  handleRoute() {
    const hash = window.location.hash.slice(2);
    const route = this.routes[hash];
    if (!route) {
      window.location.hash = '#/';
      return;
    }
    try {
      this.navigate(route);
      this.updateActiveNav(hash);
    } catch (error) {
      this.showErrorPage('Erro ao carregar página');
    }
  }
  navigate(routeName) {
    const controller = this.controllers[routeName];
    if (!controller) {
      window.location.hash = '#/';
      return;
    }
    if (this.currentController && this.currentController.cleanup) {
      this.currentController.cleanup();
    }
    this.currentController = controller;
    controller.init();
  }
  getCurrentRoute() {
    const hash = window.location.hash.slice(2);
    return this.routes[hash] || 'home';
  }
  updateActiveNav(hash) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#/${hash}` || (href === '#/' && hash === '')) {
        link.classList.add('active');
      }
    });
  }
  showErrorPage(message) {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container py-5">
        <div class="error-page text-center">
          <h2>Ops! Algo deu errado</h2>
          <p class="text-secondary">${message}</p>
          <button onclick="window.location.hash = '#/'" class="btn btn-primary mt-3">
            Voltar para Home
          </button>
        </div>
      </div>
    `;
  }
}
let router;
