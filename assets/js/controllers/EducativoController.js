class EducativoController {
  constructor() {
    this.currentTipIndex = 0;
    this.tips = [
      {
        title: 'Separe o Lixo Orgânico',
        description: 'Resíduos orgânicos podem ser compostados e transformados em adubo. Separe restos de alimentos, cascas de frutas e verduras em um recipiente específico.',
        image: 'assets/images/tips/organico.jpg'
      },
      {
        title: 'Recicle Eletrônicos Corretamente',
        description: 'Celulares, computadores e outros eletrônicos contêm materiais tóxicos. Leve-os a pontos de coleta especializados para descarte adequado.',
        image: 'assets/images/tips/eletronicos.jpg'
      },
      {
        title: 'Óleo de Cozinha Usado',
        description: 'Nunca descarte óleo de cozinha no ralo. Armazene em garrafas PET e leve a pontos de coleta. Um litro de óleo contamina até 1 milhão de litros de água.',
        image: 'assets/images/tips/oleo.jpg'
      },
      {
        title: 'Pilhas e Baterias',
        description: 'Pilhas e baterias contêm metais pesados que contaminam o solo. Descarte em pontos de coleta específicos, nunca no lixo comum.',
        image: 'assets/images/tips/pilhas.jpg'
      },
      {
        title: 'Móveis e Entulho',
        description: 'Para descartar móveis velhos e entulho de construção, solicite coleta volumosa ou leve a ecopontos. Não deixe na calçada.',
        image: 'assets/images/tips/moveis.jpg'
      }
    ];
  }
  init() {
    this.render();
    this.bindEvents();
    this.showTip(0);
  }
  render() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container py-5">
        <h2 class="text-center mb-5">Dicas de Descarte Consciente</h2>
        <!-- Main Tip Carousel -->
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8">
            <div class="card">
              <div class="card-body p-4">
                <div id="tip-content" class="text-center">
                  <!-- Tip content will be loaded here -->
                </div>
                <div class="d-flex justify-content-between align-items-center mt-4">
                  <button id="prev-tip" class="btn btn-secondary">◄ Anterior</button>
                  <span id="tip-counter" class="text-secondary"></span>
                  <button id="next-tip" class="btn btn-secondary">Próximo ►</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- All Tips Grid -->
        <div class="row">
          <div class="col-12 mb-4">
            <h4 class="text-center">Todas as Dicas</h4>
          </div>
          ${this.tips.map((tip, index) => `
            <div class="col-md-4 mb-4">
              <div class="card h-100 tip-card" data-tip-index="${index}">
                <div class="card-body">
                  <h5 class="card-title">${tip.title}</h5>
                  <p class="card-text">${tip.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  bindEvents() {
    const prevBtn = document.getElementById('prev-tip');
    const nextBtn = document.getElementById('next-tip');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevTip());
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextTip());
    }
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.tipIndex);
        this.showTip(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
  showTip(index) {
    if (index < 0 || index >= this.tips.length) return;
    this.currentTipIndex = index;
    const tip = this.tips[index];
    const content = document.getElementById('tip-content');
    if (content) {
      content.innerHTML = `
        <div class="mb-4">
          <div class="bg-light rounded p-4 mb-3" style="min-height: 200px; display: flex; align-items: center; justify-content: center;">
             <img src="${tip.image}" class="card-img-top" alt="${tip.titulo}" style="height: 250px; object-fit: cover;">
          </div>
        </div>
        <h3 class="mb-3">${tip.title}</h3>
        <p class="lead">${tip.description}</p>
      `;
    }
    const counter = document.getElementById('tip-counter');
    if (counter) {
      counter.textContent = `${index + 1} / ${this.tips.length}`;
    }
    const prevBtn = document.getElementById('prev-tip');
    const nextBtn = document.getElementById('next-tip');
    if (prevBtn) {
      prevBtn.disabled = index === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = index === this.tips.length - 1;
    }
  }
  nextTip() {
    if (this.currentTipIndex < this.tips.length - 1) {
      this.showTip(this.currentTipIndex + 1);
    }
  }
  prevTip() {
    if (this.currentTipIndex > 0) {
      this.showTip(this.currentTipIndex - 1);
    }
  }
  cleanup() {
    this.currentTipIndex = 0;
  }
}
