class HomeController {
  constructor() {
    this.currentTipIndex = 0;
    this.tips = [];
  }
  init() {
    this.tips = window.SEED_DICAS || [];
    this.render();
    this.bindEvents();
  }
  render() {
    const container = document.getElementById('app-container');
    const previewTips = this.tips.slice(0, 3);
    container.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section bg-primary text-white py-5">
        <div class="container text-center">
          <h1 class="display-4 fw-bold mb-3 text-white">Transforme o seu lixo em reciclagem!</h1>
          <p class="lead mb-4">Encontre pontos de descarte, solicite coleta volumosa e contribua para um ambiente mais sustentável</p>
          <div class="d-flex gap-3 justify-content-center flex-wrap">
            <a href="#/mapa" class="btn btn-light btn-lg">Encontrar Pontos</a>
            <a href="#/solicitar" class="btn btn-outline-light btn-lg">Solicitar Coleta</a>
          </div>
        </div>
      </section>
      <!-- Como Funciona -->
      <section class="py-5">
        <div class="container">
          <h2 class="text-center mb-5">Como Funciona</h2>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="card text-center h-100">
                <div class="card-body">
                  <h5 class="card-title">Encontre Pontos</h5>
                  <p class="card-text">Localize pontos de descarte próximos a você e veja quais tipos de resíduos são aceitos</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center h-100">
                <div class="card-body">
                  <h5 class="card-title">Solicite Coleta</h5>
                  <p class="card-text">Precisa descartar itens volumosos? Solicite coleta no seu endereço de forma simples</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center h-100">
                <div class="card-body">
                  <h5 class="card-title">Denuncie</h5>
                  <p class="card-text">Viu descarte irregular? Faça uma denúncia e ajude a manter nossa cidade limpa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Dicas Rápidas Carousel -->
      <section class="py-5 bg-light">
        <div class="container">
          <h2 class="text-center mb-4">Dicas de Descarte Consciente</h2>
          <p class="text-center text-secondary mb-5">Aprenda como descartar corretamente diferentes tipos de resíduos</p>
          ${previewTips.length > 0 ? `
          <!-- Carousel -->
          <div id="tipsCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-indicators">
              ${previewTips.map((_, index) => `
                <button type="button" data-bs-target="#tipsCarousel" data-bs-slide-to="${index}" 
                  ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                  aria-label="Dica ${index + 1}"></button>
              `).join('')}
            </div>
            <div class="carousel-inner">
              ${previewTips.map((tip, index) => `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                  <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6">
                      <div class="card border-0 shadow-sm">
                        <img src="${tip.imagem}" class="card-img-top" alt="${tip.titulo}" style="height: 250px; object-fit: cover;">
                        <div class="card-body text-center p-4">
                          <h5 class="card-title fw-bold mb-3">${tip.titulo}</h5>
                          <p class="card-text text-secondary">${tip.descricao}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#tipsCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#tipsCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Próximo</span>
            </button>
          </div>
          ` : ''}
          <div class="text-center">
            <a href="#/educativo" class="btn btn-primary btn-lg">Ver Todas as Dicas</a>
          </div>
        </div>
      </section>
    `;
  }
  bindEvents() {
  }
  cleanup() {
  }
}
