class MapComponent {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.markers = {};
  }
  init(center = CONFIG.DEFAULT_MAP_CENTER, zoom = CONFIG.DEFAULT_MAP_ZOOM) {
    const container = document.getElementById(this.containerId);
    if (!container) {
      return;
    }
    this.map = L.map(this.containerId).setView(center, zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
  }
  addMarker(ponto) {
    if (!this.map) return;
    const icon = this.getIconForTipo(ponto.tipos[0]);
    const marker = L.marker(
      [ponto.coordenadas.latitude, ponto.coordenadas.longitude],
      { icon: icon }
    ).addTo(this.map);
    marker.bindPopup(this.createPopupContent(ponto));
    marker.on('click', () => this.onMarkerClick(ponto));
    this.markers[ponto.id] = marker;
  }
  removeMarker(pontoId) {
    if (this.markers[pontoId]) {
      this.map.removeLayer(this.markers[pontoId]);
      delete this.markers[pontoId];
    }
  }
  clearMarkers() {
    Object.keys(this.markers).forEach(id => this.removeMarker(id));
  }
  getIconForTipo(tipo) {
    const iconUrls = {
      'moveis': 'assets/images/icons/moveis.png',
      'eletrodomesticos': 'assets/images/icons/eletro.png',
      'entulhos': 'assets/images/icons/entulho.png',
      'oleo': 'assets/images/icons/oleo.png',
      'pilhas': 'assets/images/icons/pilhas.png',
      'eletronicos': 'assets/images/icons/eletronicos.png'
    };
    return L.icon({
      iconUrl: iconUrls[tipo] || iconUrls['eletronicos'],
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  }
  createPopupContent(ponto) {
    return `
      <div class="map-popup">
        <h6>${ponto.nome}</h6>
        <p class="mb-1"><small>${ponto.endereco.logradouro}</small></p>
        <p class="mb-1"><small>${ponto.horario}</small></p>
        <button class="btn btn-sm btn-primary" onclick="showPontoDetails('${ponto.id}')">
          Ver Detalhes
        </button>
      </div>
    `;
  }
  onMarkerClick(ponto) {
    window.dispatchEvent(new CustomEvent('marker-clicked', { detail: ponto }));
  }
  fitBounds(pontos) {
    if (!this.map || pontos.length === 0) return;
    const bounds = L.latLngBounds(
      pontos.map(p => [p.coordenadas.latitude, p.coordenadas.longitude])
    );
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }
  centerOn(lat, lng) {
    if (this.map) {
      this.map.setView([lat, lng], 15);
    }
  }
}
