class PerfilController {
  constructor() {
    this.currentTab = 'solicitacoes';
  }

  init() {
    this.render();
    this.loadUserData();
    this.bindEvents();
  }

  render() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container py-5">
        <div class="row">
          <!-- User Info -->
          <div class="col-md-12 mb-4">
            <div class="card">
              <div class="card-body text-center">
                <img id="user-foto" src="" alt="Foto do usuário" class="rounded-circle mb-3" width="100" height="100">
                <h4 id="user-nome"></h4>
                <p id="user-email" class="text-secondary"></p>
              </div>
            </div>
          </div>
          
          <!-- Tabs -->
          <div class="col-md-12">
            <ul class="nav nav-tabs mb-4" id="perfil-tabs">
              <li class="nav-item2">
                <a class="nav-link2 active" href="#" data-tab="solicitacoes">Solicitações</a>
              </li>
              <li class="nav-item2">
                <a class="nav-link2" href="#" data-tab="denuncias">Denúncias</a>
              </li>
              <li class="nav-item2">
                <a class="nav-link2" href="#" data-tab="favoritos">Favoritos</a>
              </li>
            </ul>
            
            <!-- Tab Content -->
            <div id="tab-content">
              <!-- Content will be loaded here -->
            </div>
          </div>
        </div>
      </div>
    `;
  }

  loadUserData() {
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    if (usuario) {
      document.getElementById('user-nome').textContent = usuario.nome;
      document.getElementById('user-email').textContent = usuario.email;
      document.getElementById('user-foto').src = usuario.foto;
    }
    
    this.loadTabContent('solicitacoes');
  }

  bindEvents() {
    const tabs = document.querySelectorAll('[data-tab]');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  switchTab(tabName) {
    const tabs = document.querySelectorAll('[data-tab]');
    tabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      }
    });
    
    this.currentTab = tabName;
    this.loadTabContent(tabName);
  }

  loadTabContent(tabName) {
    const container = document.getElementById('tab-content');
    
    switch(tabName) {
      case 'solicitacoes':
        this.loadSolicitacoes(container);
        break;
      case 'denuncias':
        this.loadDenuncias(container);
        break;
      case 'favoritos':
        this.loadFavoritos(container);
        break;
    }
  }

  loadSolicitacoes(container) {
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    const solicitacoes = DataService.getSolicitacoes(usuario.id);
    
    solicitacoes.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    
    if (solicitacoes.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="empty-state-title">Nenhuma solicitação encontrada</p>
          <p class="empty-state-text">Você ainda não fez nenhuma solicitação de coleta</p>
          <a href="#/solicitar" class="btn btn-primary mt-3">Solicitar Coleta</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = solicitacoes.map(sol => `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h5 class="card-title">Protocolo: ${sol.protocolo}</h5>
              <p class="text-secondary mb-2">${new Date(sol.dataCriacao).toLocaleDateString('pt-BR')}</p>
              <p class="mb-1"><strong>Endereço:</strong> ${sol.endereco.logradouro}, ${sol.endereco.numero}</p>
              <p class="mb-1"><strong>Itens:</strong> ${sol.itens.join(', ')}</p>
              <p class="mb-0"><strong>Descrição:</strong> ${sol.descricao}</p>
            </div>
            <span class="badge ${this.getStatusBadgeClass(sol.status)}">${this.getStatusLabel(sol.status)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  loadDenuncias(container) {
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    const denuncias = DataService.getDenuncias(usuario.id, false);
    
    denuncias.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    
    if (denuncias.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="empty-state-title">Nenhuma denúncia encontrada</p>
          <p class="empty-state-text">Você ainda não fez nenhuma denúncia</p>
          <a href="#/denunciar" class="btn btn-primary mt-3">Fazer Denúncia</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = denuncias.map(den => {

      let localizacaoText = 'Localização não informada';
      
      if (typeof den.localizacao === 'string') {
        localizacaoText = den.localizacao;
      } else if (den.localizacao && typeof den.localizacao === 'object') {
        if (den.localizacao.descricao) {
          if (typeof den.localizacao.descricao === 'string') {
            localizacaoText = den.localizacao.descricao;
          } else if (typeof den.localizacao.descricao === 'object' && den.localizacao.descricao.descricao) {
            localizacaoText = den.localizacao.descricao.descricao;
          }
        }
      }
      
      return `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Protocolo: ${den.protocolo}</h5>
            <p class="text-secondary mb-2">${new Date(den.dataCriacao).toLocaleDateString('pt-BR')}</p>
            <p class="mb-1"><strong>Localização:</strong> ${localizacaoText}</p>
            <p class="mb-0"><strong>Descrição:</strong> ${den.descricao}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  loadFavoritos(container) {
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    const favoritosIds = DataService.getFavoritos(usuario.id);
    const pontos = DataService.getPontos();
    const favoritosPontos = pontos.filter(p => favoritosIds.includes(p.id));
    
    if (favoritosPontos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="empty-state-title">Nenhum favorito encontrado</p>
          <p class="empty-state-text">Você ainda não favoritou nenhum ponto de descarte</p>
          <a href="#/mapa" class="btn btn-primary mt-3">Ver Mapa</a>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div class="row">
        ${favoritosPontos.map(ponto => `
          <div class="col-md-6 mb-3">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${ponto.nome}</h5>
                <p class="card-text mb-2">${ponto.endereco.logradouro}</p>
                <p class="card-text mb-2"><small>${ponto.horario}</small></p>
                <div class="d-flex gap-1 flex-wrap">
                  ${ponto.tipos.map(tipo => {
                    const tipoInfo = CONFIG.TIPOS_RESIDUOS.find(t => t.id === tipo);
                    return `<span class="badge bg-success">${tipoInfo ? tipoInfo.label : tipo}</span>`;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getStatusBadgeClass(status) {
    const classes = {
      'pendente': 'badge-warning',
      'agendada': 'badge-info',
      'coletada': 'badge-success',
      'cancelada': 'badge-danger'
    };
    return classes[status] || 'badge-secondary';
  }

  getStatusLabel(status) {
    const labels = {
      'pendente': 'Pendente',
      'agendada': 'Agendada',
      'coletada': 'Coletada',
      'cancelada': 'Cancelada'
    };
    return labels[status] || status;
  }

  cleanup() {
    this.currentTab = 'solicitacoes';
  }
}
