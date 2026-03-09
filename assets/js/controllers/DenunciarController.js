class DenunciarController {
  constructor() {
    this.imagePreview = null;
  }
  init() {
    this.render();
    setTimeout(() => {
      this.imagePreview = new ImagePreview('denuncia-foto-input', 'denuncia-image-preview');
    }, 0);
    this.bindEvents();
  }
  render() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-4">Denunciar Descarte Irregular</h2>
            <p class="text-secondary mb-4">Ajude a manter nossa cidade limpa denunciando descarte irregular de resíduos</p>
            <form id="denunciar-form">
              <!-- Localização -->
              <div class="mb-3">
                <label for="localizacao" class="form-label">Localização *</label>
                <textarea class="form-control" id="localizacao" name="localizacao" rows="2" placeholder="Descreva o local (ex: Próximo ao Parque Ibirapuera, portão 3)" required></textarea>
                <div class="invalid-feedback"></div>
              </div>
              <!-- Descrição -->
              <div class="mb-3">
                <label for="denuncia-descricao" class="form-label">Descrição da Denúncia *</label>
                <textarea class="form-control" id="denuncia-descricao" name="descricao" rows="4" required></textarea>
                <div class="form-text">Mínimo 20 caracteres</div>
                <div class="invalid-feedback"></div>
              </div>
              <!-- Foto -->
              <div class="mb-3">
                <label for="denuncia-foto-input" class="form-label">Foto *</label>
                <input type="file" class="form-control" id="denuncia-foto-input" accept="image/*" required>
                <div class="form-text">Obrigatória - Máximo 5MB - JPG ou PNG</div>
                <div id="denuncia-image-preview" class="image-preview-container"></div>
              </div>
              <!-- Anônima -->
              <div class="mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="anonima" name="anonima">
                  <label class="form-check-label" for="anonima">
                    Denúncia anônima
                  </label>
                  <div class="form-text">Se marcado, sua identidade não será vinculada à denúncia</div>
                </div>
              </div>
              <!-- Buttons -->
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-secondary" onclick="window.location.hash='#/'">Cancelar</button>
                <button type="submit" class="btn btn-primary">Enviar Denúncia</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  bindEvents() {
    const form = document.getElementById('denunciar-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const formData = this.getFormData();
    const validation = ValidationService.validateDenuncia(formData);
    if (!validation.valid) {
      this.showValidationErrors(validation.errors);
      return;
    }
    const foto = this.imagePreview ? this.imagePreview.getValue() : null;
    if (!foto) {
      showErrorToast('Foto é obrigatória para denúncias');
      return;
    }
    const protocolo = ProtocolService.generate('denuncia');
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    const denuncia = {
      id: 'den-' + Date.now(),
      protocolo,
      usuarioId: formData.anonima ? null : usuario.id,
      anonima: formData.anonima,
      localizacao: formData.localizacao,
      descricao: formData.descricao,
      foto,
      dataCriacao: new Date().toISOString()
    };
    const result = DataService.createDenuncia(denuncia);
    if (result.success) {
      this.showSuccessModal(protocolo, formData.anonima);
    } else {
      showErrorToast(result.error || 'Erro ao salvar denúncia');
    }
  }
  getFormData() {
    return {
      localizacao: {
        descricao: document.getElementById('localizacao').value
      },
      descricao: document.getElementById('denuncia-descricao').value,
      anonima: document.getElementById('anonima').checked
    };
  }
  showValidationErrors(errors) {
    errors.forEach(error => {
      showErrorToast(error);
    });
  }
  showSuccessModal(protocolo, anonima) {
    const modal = new Modal({
      title: 'Denúncia Enviada!',
      body: `
        <div class="text-center">
          <div class="mb-3">
            <svg width="64" height="64" fill="currentColor" class="text-success">
              <circle cx="32" cy="32" r="30" fill="currentColor"/>
              <path d="M20 32 L28 40 L44 24" stroke="white" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <h5>Protocolo: <strong>${protocolo}</strong></h5>
          <p class="text-secondary">Guarde este protocolo para acompanhar sua denúncia</p>
          ${anonima ? '<p class="text-info"><small>Esta denúncia foi registrada como anônima</small></p>' : ''}
        </div>
      `,
      buttons: [
        {
          text: 'Ver Perfil',
          class: 'btn-primary',
          onClick: () => window.location.hash = '#/perfil'
        },
        {
          text: 'Nova Denúncia',
          class: 'btn-secondary',
          onClick: () => window.location.reload()
        }
      ]
    });
    modal.show();
  }
  cleanup() {
    this.imagePreview = null;
  }
}
