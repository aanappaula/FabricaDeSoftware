class SolicitarController {
  constructor() {
    this.imagePreview = null;
  }
  init() {
    this.render();
    this.bindEvents();
    this.imagePreview = new ImagePreview('foto-input', 'image-preview-container');
  }
  render() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="mb-4">Solicitar Coleta Volumosa</h2>
            <p class="text-secondary mb-4">Preencha o formulário abaixo para solicitar coleta de resíduos volumosos no seu endereço</p>
            <form id="solicitar-form">
              <!-- Endereço -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title mb-3">Endereço</h5>
                  <div class="mb-3">
                    <label for="logradouro" class="form-label">Logradouro *</label>
                    <input type="text" class="form-control" id="logradouro" name="logradouro" required>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label for="numero" class="form-label">Número *</label>
                      <input type="text" class="form-control" id="numero" name="numero" required>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="col-md-8 mb-3">
                      <label for="complemento" class="form-label">Complemento</label>
                      <input type="text" class="form-control" id="complemento" name="complemento">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="bairro" class="form-label">Bairro *</label>
                      <input type="text" class="form-control" id="bairro" name="bairro" required>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="cep" class="form-label">CEP *</label>
                      <input type="text" class="form-control" id="cep" name="cep" placeholder="00000-000" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-8 mb-3">
                      <label for="cidade" class="form-label">Cidade *</label>
                      <input type="text" class="form-control" id="cidade" name="cidade" value="São Paulo" required>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="estado" class="form-label">Estado *</label>
                      <input type="text" class="form-control" id="estado" name="estado" value="SP" required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Itens -->
              <div class="card mb-4">
                <div class="card-body">
                  <h5 class="card-title mb-3">Itens para Coleta *</h5>
                  <div id="itens-checkboxes">
                    <div class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" value="moveis" id="item-moveis" name="itens">
                      <label class="form-check-label" for="item-moveis">Móveis</label>
                    </div>
                    <div class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" value="eletrodomesticos" id="item-eletro" name="itens">
                      <label class="form-check-label" for="item-eletro">Eletrodomésticos</label>
                    </div>
                    <div class="form-check mb-2">
                      <input class="form-check-input" type="checkbox" value="entulhos" id="item-entulho" name="itens">
                      <label class="form-check-label" for="item-entulho">Entulho</label>
                    </div>
                  </div>
                  <div class="invalid-feedback" id="itens-error"></div>
                </div>
              </div>
              <!-- Descrição -->
              <div class="mb-3">
                <label for="descricao" class="form-label">Descrição dos Itens *</label>
                <textarea class="form-control" id="descricao" name="descricao" rows="3" required></textarea>
                <div class="form-text">Mínimo 10 caracteres</div>
                <div class="invalid-feedback"></div>
              </div>
              <!-- Foto -->
              <div class="mb-3">
                <label for="foto-input" class="form-label">Foto (opcional)</label>
                <input type="file" class="form-control" id="foto-input" accept="image/*">
                <div class="form-text">Máximo 5MB - JPG ou PNG</div>
                <div id="image-preview-container" class="image-preview-container"></div>
              </div>
              <!-- Data Preferencial -->
              <div class="mb-4">
                <label for="data-preferencial" class="form-label">Data Preferencial</label>
                <input type="date" class="form-control" id="data-preferencial" name="dataPreferencial">
                <div class="form-text">Mínimo 3 dias a partir de hoje</div>
              </div>
              <!-- Buttons -->
              <div class="d-flex gap-2">
                <button type="button" class="btn btn-secondary" onclick="window.location.hash='#/'">Cancelar</button>
                <button type="submit" class="btn btn-primary">Solicitar Coleta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  bindEvents() {
    const form = document.getElementById('solicitar-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  async handleSubmit(event) {
    event.preventDefault();
    const formData = this.getFormData();
    const validation = ValidationService.validateSolicitacao(formData);
    if (!validation.valid) {
      this.showValidationErrors(validation.errors);
      return;
    }
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    const solicitacoes = DataService.getSolicitacoes(usuario.id);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const solicitacoesDoMes = solicitacoes.filter(sol => {
      const solDate = new Date(sol.dataCriacao);
      return solDate.getMonth() === currentMonth && 
             solDate.getFullYear() === currentYear &&
             sol.status !== 'cancelada';
    });
    if (solicitacoesDoMes.length >= CONFIG.MAX_SOLICITACOES_PER_MONTH) {
      showErrorToast(`Limite de ${CONFIG.MAX_SOLICITACOES_PER_MONTH} solicitações por mês atingido`);
      return;
    }
    const protocolo = ProtocolService.generate('solicitacao');
    const foto = this.imagePreview ? this.imagePreview.getValue() : null;
    const solicitacao = {
      id: 'sol-' + Date.now(),
      protocolo,
      usuarioId: usuario.id,
      endereco: formData.endereco,
      itens: formData.itens,
      descricao: formData.descricao,
      foto,
      dataPreferencial: formData.dataPreferencial,
      status: STATUS_SOLICITACAO.PENDENTE,
      dataCriacao: new Date().toISOString()
    };
    const result = DataService.createSolicitacao(solicitacao);
    if (result.success) {
      this.showSuccessModal(protocolo);
    } else {
      showErrorToast(result.error || 'Erro ao salvar solicitação');
    }
  }
  getFormData() {
    const itensCheckboxes = document.querySelectorAll('input[name="itens"]:checked');
    const itens = Array.from(itensCheckboxes).map(cb => cb.value);
    return {
      endereco: {
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value
      },
      itens,
      descricao: document.getElementById('descricao').value,
      dataPreferencial: document.getElementById('data-preferencial').value
    };
  }
  showValidationErrors(errors) {
    errors.forEach(error => {
      showErrorToast(error);
    });
  }
  showSuccessModal(protocolo) {
    const modal = new Modal({
      title: 'Solicitação Enviada!',
      body: `
        <div class="text-center">
          <div class="mb-3">
            <svg width="64" height="64" fill="currentColor" class="text-success">
              <circle cx="32" cy="32" r="30" fill="currentColor"/>
              <path d="M20 32 L28 40 L44 24" stroke="white" stroke-width="3" fill="none"/>
            </svg>
          </div>
          <h5>Protocolo: <strong>${protocolo}</strong></h5>
          <p class="text-secondary">Guarde este protocolo para acompanhar sua solicitação</p>
        </div>
      `,
      buttons: [
        {
          text: 'Ver Perfil',
          class: 'btn-primary',
          onClick: () => window.location.hash = '#/perfil'
        },
        {
          text: 'Nova Solicitação',
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
