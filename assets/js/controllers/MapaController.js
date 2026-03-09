class MapaController {
  constructor() {
    this.mapComponent = null;
    this.selectedFilters = [];
    this.allPontos = [];
  }
  init() {
    this.render();
    this.loadPontos();
    this.bindEvents();
  }
  render() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container-fluid">
        <div class="row">
          <!-- Sidebar -->
          <div class="col-md-3 bg-white p-4 border-end">
            <h4 class="mb-4">Filtrar por Tipo</h4>
            <div id="filter-checkboxes">
              ${CONFIG.TIPOS_RESIDUOS.map(tipo => `
                <div class="form-check mb-2">
                  <input class="form-check-input filter-checkbox" type="checkbox" value="${tipo.id}" id="filter-${tipo.id}">
                  <label class="form-check-label" for="filter-${tipo.id}">
                    ${tipo.label}
                  </label>
                </div>
              `).join('')}
            </div>
            <button id="clear-filters" class="btn btn-secondary w-100 mt-3">Limpar Filtros</button>
            <hr class="my-4">
            <h5 class="mb-3">Pontos Encontrados</h5>
            <div id="pontos-list" class="overflow-auto" style="max-height: 400px;">
              <!-- Pontos will be loaded here -->
            </div>
          </div>
          <!-- Map -->
          <div class="col-md-9 p-0">
            <div id="map-container" style="height: calc(100vh - 80px);"></div>
          </div>
        </div>
      </div>
    `;
  }
  loadPontos() {
    this.allPontos = DataService.getPontos();
    this.updatePontosList(this.allPontos);
    this.initMap();
  }
  initMap() {
    this.mapComponent = new MapComponent('map-container');
    this.mapComponent.init();
    this.allPontos.forEach(ponto => {
      this.mapComponent.addMarker(ponto);
    });
    if (this.allPontos.length > 0) {
      this.mapComponent.fitBounds(this.allPontos);
    }
  }
  updatePontosList(pontos) {
    const listContainer = document.getElementById('pontos-list');
    if (pontos.length === 0) {
      listContainer.innerHTML = '<p class="text-secondary">Nenhum ponto encontrado</p>';
      return;
    }
    listContainer.innerHTML = pontos.map(ponto => `
      <div class="card mb-2">
        <div class="card-body p-3">
          <h6 class="card-title mb-1">${ponto.nome}</h6>
          <p class="card-text small text-secondary mb-1">${ponto.endereco.logradouro}</p>
          <p class="card-text small mb-2">${ponto.horario}</p>
          <div class="d-flex gap-1 flex-wrap">
            ${ponto.tipos.map(tipo => {
              const tipoInfo = CONFIG.TIPOS_RESIDUOS.find(t => t.id === tipo);
              return `<span class="badge bg-success">${tipoInfo ? tipoInfo.label : tipo}</span>`;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }
  bindEvents() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => this.handleFilterChange());
    });
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearFilters());
    }
  }
  handleFilterChange() {
    const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
    this.selectedFilters = Array.from(checkboxes).map(cb => cb.value);
    const filteredPontos = this.selectedFilters.length > 0
      ? DataService.getPontos({ tipos: this.selectedFilters })
      : this.allPontos;
    this.updatePontosList(filteredPontos);
    this.updateMapMarkers(filteredPontos);
  }
  updateMapMarkers(pontos) {
    if (!this.mapComponent) return;
    this.mapComponent.clearMarkers();
    pontos.forEach(ponto => {
      this.mapComponent.addMarker(ponto);
    });
    if (pontos.length > 0) {
      this.mapComponent.fitBounds(pontos);
    }
  }
  clearFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(cb => cb.checked = false);
    this.selectedFilters = [];
    this.updatePontosList(this.allPontos);
    this.updateMapMarkers(this.allPontos);
  }
  cleanup() {
    this.mapComponent = null;
    this.selectedFilters = [];
  }
}
